const { promisify } = require('util');
const crypto = require('crypto');

const userController = {};
const nodemailer = require('nodemailer');
const User = require('../models/User');
const MyError = require('../util/error');
const Auth = require('../auth');
const { resetPasswordMail, confirmResetPasswordMail } = require('../mails/resetPassword');

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * POST /login
 * Sign in using email and password.
 */
userController.login = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('password');
        if (!user) {
            throw new MyError(401, 'invalid credentials');
        }

        // check password
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            throw new MyError(401, 'invalid credentials');
        }

        // return token to the user
        return Auth.generateToken(user);
    } catch (err) {
        if (!err.status) {
            throw new MyError(500, 'Internal Server Error');
        }
        throw err;
    }
};

/**
 * POST /signup
 * Create a new local account.
 */
userController.postSignup = async (data) => {
    try {
        const fullnameUser = data.fullname.replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
        // count the number of user with same fullname
        const count = await User.countDocuments({ fullname: fullnameUser }) + 1;
        let initialsUser = '';
        const usernameUser = fullnameUser.toLowerCase().replace(/ /g, '') + count;
        if (fullnameUser.split(' ').length >= 2) {
            initialsUser = fullnameUser.split(' ')[0].toUpperCase().charAt(0) + fullnameUser.split(' ')[1].toUpperCase().charAt(0);
        } else {
            initialsUser = fullnameUser.toUpperCase().charAt(0);
        }

        const user = new User({
            fullname: fullnameUser,
            username: usernameUser,
            password: data.password,
            email: data.email,
            bio: data.bio,
            avatarUrl: data.avatarUrl,
            initials: initialsUser
        });
        await user.save();
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(409, 'User already exists');
        } else if (err.name === 'ValidationError') {
            throw new MyError(400, 'Missing Informations');
        }
    }
};

/**
 * GET /profile
 * Profile page.
 */
userController.getProfile = async (user) => {
    try {
    // return plain json object with lean
        const userProfile = await User.findById(user.id).select({
            fullname: 1, username: 1, bio: 1, initials: 1, _id: 0
        }).lean();
        return userProfile;
    } catch (err) {
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * PUT /profile
 * Profile page.
 */
userController.updateProfile = async (user, data) => {
    const {
        fullname, bio, initials, username
    } = data;
    try {
        const userProfile = await User.findById(user.id).select({
            fullname: 1, username: 1, bio: 1, initials: 1
        });
        userProfile.fullname = fullname;
        userProfile.bio = bio;
        userProfile.initials = initials;
        const userFound = await User.findOne({ username, _id: { $ne: user._id } });
        if (userFound) throw new MyError(400, 'Username is taken ');
        userProfile.username = username;
        await userProfile.save();
        return userProfile;
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(409, 'Update profile failed');
        } else if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /account
 * Account page (mail, password)
 */
userController.updateAccount = async (user, data) => {
    const {
        email, password
    } = data;
    try {
        const userProfile = await User.findById(user.id).select({
            password: 1, email: 1
        });
        // TODO: use validator on email
        if (email && email !== '') {
            const userFound = await User.findOne({ email, _id: { $ne: user._id } });
            if (userFound) throw new MyError(400, 'Email already used');
            userProfile.email = email;
        }
        if (password && password !== '') {
            userProfile.password = password;
        }
        await userProfile.save();
    } catch (err) {
        // TODO: add more details (ex: if same username then error)
        if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(409, 'Update account failed');
        } else if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * DELETE /account
 * Account page
 */
userController.deleteAccount = async (user) => {
    try {
        const userDeleted = await User.deleteOne({ _id: user._id });
        if (!userDeleted.ok) throw new MyError(404, 'User to delete not found');
    } catch (err) {
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * GET /account
 * Profile page.
 */
userController.getAccount = async (user) => {
    try {
        // return plain json object with lean
        const userAccount = await User.findById(user.id).select({
            email: 1
        }).lean();
        return userAccount;
    } catch (err) {
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
userController.getOauthUnlink = () => { };

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
userController.postForgot = async (email, host) => {
    try {
        let user = await User.findOne({ email });
        if (!user) throw new MyError(404, 'No user found');
        user.passwordResetToken = await randomBytesAsync(16).then(buf => buf.toString('hex'));
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user = await user.save();
        if (!user) throw new MyError(500, 'Internal Server Error');
        const token = user.passwordResetToken;
        const transporter = nodemailer.createTransport({
            service: 'Mailjet',
            auth: {
                user: process.env.MAILJET_USER,
                pass: process.env.MAILJET_PASSWORD
            }
        });
        await transporter.sendMail(resetPasswordMail(email, host, token));
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /reset/:token
 * Reset password with the new one.
 */
userController.resetPassword = async (token, password) => {
    try {
        const user = await User.findOne({ passwordResetToken: token }).where('passwordResetExpires').gt(Date.now());
        if (!user) throw new MyError(403, 'User can\'t reset his password');
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'Mailjet',
            auth: {
                user: process.env.MAILJET_USER,
                pass: process.env.MAILJET_PASSWORD
            }
        });
        await transporter.sendMail(confirmResetPasswordMail(user.email));
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
module.exports = userController;

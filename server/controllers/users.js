const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const MyError = require('../util/error');
const Auth = require('../auth');
const { resetPasswordMail, confirmResetPasswordMail } = require('../mails/resetPassword');

const boardController = require('../controllers/boards');

const randomBytesAsync = promisify(crypto.randomBytes);
const User = require('../models/User');

// ======================== //
// ==== Post functions ==== //
// ======================== //

/**
 * Add the board to the the user
 */
exports.postBoard = async (userId, boardId) => {
    try {
        await User.updateOne({ _id: userId },
            { $addToSet: { boards: { _id: boardId } } })
            .catch(async () => { throw new MyError(404, 'User not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Sign in using email and password.
 */
exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('password');
        if (!user) {
            throw new MyError(403, 'Invalid credentials.');
        }

        // check password
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            throw new MyError(403, 'Invalid credentials.');
        }

        // return token to the user
        return Auth.generateToken(user);
    } catch (err) {
        if (!err.status) {
            throw new MyError(500, 'Internal server error.');
        }
        throw err;
    }
};

/**
 * Create a new local account.
 */
exports.signUp = async (data) => {
    try {
        const fullNameUser = data.fullName.replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
        // count the number of user with same fullName
        const count = await User.countDocuments({ fullName: fullNameUser }) + 1;
        let initialsUser = '';
        const usernameUser = fullNameUser.toLowerCase().replace(/ /g, '') + count;
        if (fullNameUser.split(' ').length >= 2) {
            initialsUser = fullNameUser.split(' ')[0].toUpperCase().charAt(0) + fullNameUser.split(' ')[1].toUpperCase().charAt(0);
        } else {
            initialsUser = fullNameUser.toUpperCase().charAt(0);
        }

        const user = new User({
            fullName: fullNameUser,
            username: usernameUser,
            password: data.password,
            email: data.email,
            biography: data.biography,
            avatarUrl: data.avatarUrl,
            initials: initialsUser
        });
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(409, 'An account already exists for this email.');
        }
        return new MyError(500, 'Internal server error');
    }
};
/**
 * Create a random token, then the send user an email with a reset link.
 */
exports.forgot = async (email, host) => {
    try {
        let user = await User.findOne({ email });
        if (!user) throw new MyError(404, 'No user found');
        user.passwordResetToken = await randomBytesAsync(16).then(buf => buf.toString('hex'));
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user = await user.save();
        if (!user) throw new MyError(500, 'Internal server error');
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
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Reset password with the new one.
 */
exports.resetPassword = async (token, password) => {
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
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Update password with old password confirmation.
 */
userController.updatePassword = async (oldPassword, newPassword, user) => {
    try {
        const userCheck = await User.findById(user._id).select('password');
        if (!userCheck) {
            throw new MyError(403, 'Invalid credentials.');
        }
        const isMatch = await user.comparePassword(oldPassword, userCheck.password);
        if (!isMatch) {
            throw new MyError(403, 'Invalid password.');
        }
        user.password = newPassword;
        await user.save();
        return user;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

// ======================== //
// ===== Get functions ==== //
// ======================== //

/**
 * Profile page.
 */
exports.getProfile = async (user) => {
    try {
    // return plain json object with lean
        const userProfile = await User.findById(user.id).select({
            fullName: 1, username: 1, bio: 1, initials: 1, email: 1, _id: 0
        }).lean();
        return userProfile;
    } catch (err) {
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Profile page.
 */
exports.getAccount = async (user) => {
    try {
        // return plain json object with lean
        const userAccount = await User.findById(user._id).select({
            email: 1
        }).lean();
        return userAccount;
    } catch (err) {
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// ===== Put functions ==== //
// ======================== //
/**
 * Profile page.
 */
exports.putProfile = async (user, data) => {
    const {
        fullName, bio, initials
    } = data;
    try {
        const userProfile = await User.findById(user._id).select({
            fullName: 1, username: 1, biography: 1, initials: 1
        });
        userProfile.fullName = fullName;
        userProfile.biography = biography;
        userProfile.initials = initials;
        await userProfile.save();
        return userProfile;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(400, 'Update profile failed');
        }
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Update account page (mail, password)
 */
exports.putAccount = async (user, data) => {
    const {
        email, password
    } = data;
    try {
        const userProfile = await User.findById(user._id).select({
            password: 1, email: 1
        });
        if (email && email !== '') {
            const userFound = await User.findOne({ email, _id: { $ne: user._id } });
            if (userFound) throw new MyError(409, 'Email already used');
            userProfile.email = email;
        }
        if (password && password !== '') {
            userProfile.password = password;
        }
        await userProfile.save();
    } catch (err) {
        // TODO: add more details (ex: if same username then error)
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};
// ======================== //
// === Delete functions === //
// ======================== //
/**
 * remove account page
 */
exports.deleteAccount = async (user) => {
    try {
        await User.deleteOne({ _id: user._id });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Remove the board from the user
 */
exports.deleteBoard = async (userId, boardId) => {
    try {
        await boardController.removeMember(boardId, userId);
        await exports.removeBoard(userId, boardId);
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.findMemberWithMail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new MyError(404, 'User not found');
        return user;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.removeBoard = async (userId, boardId) => {
    try {
        await User.updateOne({ _id: userId },
            { $pull: { boards: { _id: boardId } } })
            .catch(async () => { throw new MyError(404, 'User not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.joinTeam = async (userId, teamId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new MyError(404, 'User unknown');

        await User.updateOne({ _id: userId },
            { $addToSet: { teams: { _id: teamId } } })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.leaveTeam = async (userId, teamId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new MyError(404, 'User unknown');

        await User.updateOne({ _id: userId },
            { $pull: { teams: { _id: teamId } } })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

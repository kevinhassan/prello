const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const MyError = require('../util/error');
const Auth = require('../auth');
const { resetPasswordMail, confirmResetPasswordMail } = require('../mails/resetPassword');

const boardController = require('../controllers/boards');
const teamController = require('../controllers/teams');

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
        const user = await User.findOne({ email }).select('password _id');
        if (!user) {
            throw new MyError(403, 'Invalid credentials.');
        }
        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new MyError(403, 'Invalid credentials.');
        }
        // return token + id to the user
        return { token: Auth.generateToken(user), userId: user._id };
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
        const findUser = await User.findOne({ email: data.email }).select('-_id email');
        if (findUser) throw new MyError(409, 'An account already exists for this email.');
        const user = new User({
            fullName: data.fullName,
            password: data.password,
            email: data.email,
            biography: data.biography,
            avatarUrl: data.avatarUrl,
        });
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        if (err.status) throw err;
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
exports.updatePassword = async (oldPassword, newPassword, user) => {
    try {
        const userCheck = await User.findById(user._id).select('password');
        if (!userCheck) {
            throw new MyError(403, 'Invalid credentials.');
        }
        const isMatch = await userCheck.comparePassword(oldPassword);

        if (!isMatch) {
            throw new MyError(403, 'Invalid password.');
        }
        userCheck.password = newPassword;
        await userCheck.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

// ======================== //
// ===== Get functions ==== //
// ======================== //

/**
 * User authenticated profile.
 */
exports.getProfile = async (userId) => {
    try {
        const userProfile = await User.findById(userId).select('-password').populate('teams');
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
        const userAccount = await User.findById(user._id).select('email');
        return userAccount;
    } catch (err) {
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Member (seen from anybody)
 */
exports.getUser = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password -passwordResetExpires -passwordResetToken').populate([{
            path: 'teams',
            match: { isVisible: true }
        }, {
            path: 'boards',
            match: { $and: [{ visibility: 'public' }, { isArchived: false }] },
            populate: [
                {
                    path: 'lists',
                    select: '_id',
                    populate: {
                        path: 'cards',
                        select: '_id'
                    }
                }, {
                    path: 'teams',
                    math: { isVisible: true },
                }, {
                    path: 'members',
                    select: 'initials _id'
                }
            ]
        }]);
        if (!user) throw new MyError(404, 'User not found');
        return user;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'User not found');
        }
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
        fullName, biography, initials
    } = data;
    try {
        const userProfile = await User.findById(user._id);
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
        const userProfile = await User.findById(user._id);
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

/**
 * Add a board
 */
exports.putBoard = async (data) => {
    try {
        const user = await User.findById(data.userId);
        user.boards.push(data.board);
        user.save();
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'MongoError' && err.code === 11000) {
            throw new MyError(400, 'Update user boards failed');
        }
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// === Delete functions === //
// ======================== //
/**
 * remove account page
 */
exports.deleteAccount = async (user, username) => {
    try {
        const userToDelete = await User.findById({ _id: user._id }).select('username');
        if (!userToDelete) {
            throw new MyError(402, 'Not existing user');
        }
        if (username !== userToDelete.username) {
            throw new MyError(403, 'Invalid username confirmation');
        }
        await Promise.all([
            userToDelete.teams ? userToDelete.teams.map(team => teamController.deleteMember(team, user._id)) : null,
            userToDelete.teams ? userToDelete.boards.map(board => boardController.deleteMember(board, user._id)) : null
        ]);
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

exports.foundMembers = async (username) => {
    try {
        const users = await User.find({ username: new RegExp(`.*${username}.*`, 'i') }).select(['username', 'email']);
        return users;
        // Do your action here..
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

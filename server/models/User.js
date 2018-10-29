const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    initials: String,
    bio: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatarUrl: String,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
}, { timestamps: true });

/**
 * Password hash middleware.
 * Get method for getting the user's intials
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
        });
    });
    if (user.fullname && user.fullname.split(' ').length >= 2) {
        user.initials = user.fullname.split(' ')[0].toUpperCase().charAt(0) + user.fullname.split(' ')[1].toUpperCase().charAt(0);
    } else {
        user.initials = user.fullname.toUpperCase().charAt(0);
    }
    next();
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, result) => {
            if (err) reject(new Error(500, 'Internal Server Error'));
            resolve(result);
        });
    });
    return isMatch;
};
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;

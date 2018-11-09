const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatarUrl: String,
    biography: String,
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    initials: String,
    password: { type: String, required: true },
    passwordResetExpires: Date,
    passwordResetToken: String,
    username: { type: String, unique: true, required: true },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
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
    next();
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, result) => {
            if (err) {
                reject(new Error(500, 'Internal Server Error'));
            }
            resolve(result);
        });
    });
    return isMatch;
};

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;

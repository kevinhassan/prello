const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const logger = require('../util/logger');

const userSchema = new mongoose.Schema({
    avatarUrl: String,
    biography: String,
    email: String,
    fullName: { type: String, required: true },
    initials: String,
    password: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    username: { type: String, unique: true },
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
    github: {
        type: {
            id: String,
            token: String,
            repos: [
                {
                    name: String,
                    private: Boolean,
                    url: String,
                }
            ]
        }
    },
}, { timestamps: true });


/**
 * Password hash middleware.
 * Get method for getting the user's intials
 */
userSchema.pre('save', async function save() {
    try {
        if (this.isModified('password')) {
            await bcrypt.genSalt(10, async (err, salt) => {
                if (err) throw err;
                bcrypt.hash(this.password, salt, null, (err, hash) => {
                    if (err) throw err;
                    this.password = hash;
                });
            });
        }
        // Avoid the case where the user update his informations
        if (this.isNew) {
            const cleanFullName = this.fullName.replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/ /g, '').toLowerCase();
            const count = await this.model('User').countDocuments({ username: new RegExp(`${cleanFullName}[0-9]*`, 'i') });
            this.username = count > 0 ? cleanFullName.toLowerCase() + count : cleanFullName.toLowerCase();
            if (!this.initials) {
                if (this.fullName.split(' ').length >= 2) {
                    this.initials = this.fullName.split(' ')[0].toUpperCase().charAt(0) + this.fullName.split(' ')[1].toUpperCase().charAt(0);
                } else {
                    this.initials = this.fullName.toUpperCase().charAt(0);
                }
            }
        }
        return this;
    } catch (err) {
        logger.error(err);
        throw err;
    }
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, result) => {
            if (err) {
                reject(new Error(500, 'Internal server error'));
            }
            resolve(result);
        });
    });
    return isMatch;
};

const User = mongoose.model('User', userSchema, 'Users');
module.exports = User;

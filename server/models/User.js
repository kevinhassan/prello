const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatarUrl: String,
    biography: String,
    email: String,
    fullName: { type: String, required: true },
    initials: String,
    password: String,
    passwordResetExpires: Date,
    passwordResetToken: String,
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
            token: String
        }
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'Users');

/**
 * Password hash middleware.
 * Get method for getting the user's intials
 */
userSchema.pre('save', async function save() {
    const user = this;
    try {
        user.password = await bcrypt.genSalt(10, async (err, salt) => {
            if (err) throw err;
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) throw err;
                user.password = hash;
            });
        });
        const cleanFullName = user.fullName.replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
        if (!user.username) {
            const count = await User.countDocuments({ fullName: user.fullName });
            user.username = cleanFullName.toLowerCase().replace(/ /g, '') + (parseInt(count, 10) + 1);
        }
        if (!user.initials) {
            if (user.fullName.split(' ').length >= 2) {
                user.initials = user.fullName.split(' ')[0].toUpperCase().charAt(0) + user.fullName.split(' ')[1].toUpperCase().charAt(0);
            } else {
                user.initials = user.fullName.toUpperCase().charAt(0);
            }
        }
    } catch (err) {
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
                reject(new Error(500, 'Internal Server Error'));
            }
            resolve(result);
        });
    });
    return isMatch;
};


module.exports = User;

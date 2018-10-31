const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isVisible: { type: Boolean, default: false },
    avatarUrl: String,
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
}, { timestamps: true });


/**
 * Add admin to the members
 */

teamSchema.pre('save', function save(next) {
    const team = this;
    if (!team.members.includes(team.admins[team.admins.length - 1])) team.members.push(team.admins[team.admins.length - 1]);
    next();
});

const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

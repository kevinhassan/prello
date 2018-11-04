const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isVisible: { type: Boolean, default: false },
    avatarUrl: String,
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isAdmin: { type: Boolean, default: false }
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
}, { timestamps: true });

/**
* Affect the first member like administrator of the team
 */
teamSchema.pre('save', function save(next) {
    const board = this;
    if (board.members.length === 1) {
        board.members[0].isAdmin = true;
    }
    next();
});

const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

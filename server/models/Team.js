const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    avatarUrl: String,
    description: String,
    isVisible: { type: Boolean, default: false },
    name: { type: String, required: true },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isAdmin: { type: Boolean, default: false }
    }]
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

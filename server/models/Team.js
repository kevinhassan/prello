const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isVisible: { type: Boolean, default: false },
    avatarUrl: String,
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        isAdmin: { type: Boolean, default: false }
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

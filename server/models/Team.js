const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isVisible: { type: Boolean, required: false },
    avatarUrl: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

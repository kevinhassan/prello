const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    avatarUrl: String,
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    description: String,
    isVisible: { type: Boolean, default: false },
    name: { type: String, required: true },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema, 'Teams');
module.exports = Team;

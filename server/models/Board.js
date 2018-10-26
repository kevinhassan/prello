const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    privacy: { type: mongoose.Schema.Types.ObjectId, ref: 'privacyType', required: true },
    name: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


const Board = mongoose.model('Board', boardSchema, 'Boards');
module.exports = Board;

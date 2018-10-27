const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    isArchived: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    privacy: { type: mongoose.Schema.Types.ObjectId, ref: 'privacyType', required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, { timestamps: true });


const Board = mongoose.model('Board', boardSchema, 'Boards');
module.exports = Board;

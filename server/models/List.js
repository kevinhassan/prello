const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
}, { timestamps: true });

const List = mongoose.model('List', listSchema, 'Lists');
module.exports = List;

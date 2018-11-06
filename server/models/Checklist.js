const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    card: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    checklistItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChecklistItem' }]
}, { timestamps: true });

const Checklist = mongoose.model('Checklist', checklistSchema, 'Checklists');
module.exports = Checklist;

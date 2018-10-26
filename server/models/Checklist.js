const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    checklistItems: [{ type: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

const Checklist = mongoose.model('Checklist', checklistSchema, 'Checklists');
module.exports = Checklist;

const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
    isChecked: { type: Boolean, required: true },
    name: { type: String, required: true },
    checklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' }]
}, { timestamps: true });


const ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema, 'ChecklistItems');
module.exports = ChecklistItem;

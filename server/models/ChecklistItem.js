const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true }
}, { timestamps: true });


const ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema, 'ChecklistItems');
module.exports = ChecklistItem;

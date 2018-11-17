const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    description: String,
    dueDate: {
        date: Date,
        isDone: { type: Boolean, default: false },
    },
    isArchived: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
    checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


const Card = mongoose.model('Card', cardSchema, 'Cards');
module.exports = Card;

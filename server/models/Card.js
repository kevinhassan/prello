const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  isArchived: { type: Boolean, required: true, default: false },
  dueDate: Date,
  index: { type: Number, required: true },
  labels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label'
  }],
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });


const Card = mongoose.model('Card', cardSchema, 'Cards');
module.exports = Card;

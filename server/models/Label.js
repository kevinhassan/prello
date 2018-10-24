const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
}, { timestamps: true });

const Label = mongoose.model('Label', LabelSchema, 'Labels');
module.exports = Label;

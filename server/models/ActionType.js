const mongoose = require('mongoose');

const actionTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

const ActionType = mongoose.model('ActionType', actionTypeSchema, 'ActionTypes');
module.exports = ActionType;

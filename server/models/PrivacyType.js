const mongoose = require('mongoose');

const privacyTypeModel = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

const PrivacyType = mongoose.model('PrivacyType', privacyTypeModel, 'PrivacyTypes');
module.exports = PrivacyType;

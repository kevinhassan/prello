const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, require: true },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    }
}, { timestamps: true });

const Attachment = mongoose.model('Attachment', attachmentSchema, 'Attachments');
module.exports = Attachment;

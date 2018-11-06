const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    readDate: Date,
    action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema, 'Notifications');
module.exports = Notification;

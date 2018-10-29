const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ActionType', required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const Action = mongoose.model('Action', actionSchema, 'Actions');
module.exports = Action;

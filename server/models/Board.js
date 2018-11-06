const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    isArchived: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    visibility: {
        type: String, enum: ['public', 'private', 'team'], required: true, default: 'public'
    },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isAdmin: { type: Boolean, default: false }
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

/**
 * Add owner to the members and has admin rights
 */
boardSchema.pre('save', function save(next) {
    const board = this;
    if (!board.members || board.members.length === 0) {
        board.members = [];
        board.members.push({ _id: board.owner, isAdmin: true });
    }
    next();
});

const Board = mongoose.model('Board', boardSchema, 'Boards');
module.exports = Board;

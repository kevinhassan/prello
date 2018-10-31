const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    isArchived: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visibility: {
        type: String, enum: ['public', 'private', 'team'], required: true, default: 'public'
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
}, { timestamps: true });

/**
 * Add owner to the members
 */
boardSchema.pre('save', function save(next) {
    const board = this;
    if (!board.members.includes(board.owner)) board.members.push(board.owner);
    next();
});

const Board = mongoose.model('Board', boardSchema, 'Boards');
module.exports = Board;

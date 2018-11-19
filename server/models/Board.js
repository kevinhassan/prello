const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    isArchived: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    visibility: {
        type: String, enum: ['public', 'private', 'team'], required: true, default: 'public'
    },
    githubRepo: {
        name: String,
        private: Boolean,
        url: String,
    },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label', default: [] }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List', default: [] }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: [] }],
}, { timestamps: true });

/**
 * Add owner to the members and has admin rights
 */
boardSchema.pre('save', function save(next) {
    const board = this;
    if (!board.members || board.members.length === 0) {
        board.members = [];
        board.members.push(board.owner);
        board.admins.push(board.owner);
    }
    next();
});

const Board = mongoose.model('Board', boardSchema, 'Boards');
module.exports = Board;

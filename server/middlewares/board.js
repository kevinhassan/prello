const Board = require('../models/Board');
const MyError = require('../util/error');

/**
 * Check if the user is member of the board
 */
const isMember = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorize user');
        const board = await Board.findById(req.params.boardId).select('members');
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        const member = board.members.find(member => member._id.toString() === req.user._id.toString());
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
* Check if the user is member of the board and admin
*/
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorize user');
        const board = await Board.findById(req.params.boardId).select('members');

        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        const member = board.members.find(member => member._id.toString() === req.user._id.toString() && member.isAdmin);
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { isMember, isAdmin };

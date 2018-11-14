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
        const member = board.members.find(member => req.user._id.toString() === member._id.toString());
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
        const board = await Board.findById(req.params.boardId).select('admins');

        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        const member = board.admins.find(admin => req.user._id.toString() === admin._id.toString());
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
 * Check if the user can see the board.
 */
const canSee = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.boardId).select('visibility members teams').populate([
            {
                path: 'teams',
                select: 'members',
                populate: {
                    path: 'members',
                    select: '_id'
                }
            }, {
                path: 'members',
                select: '_id'
            }
        ]);

        if (!board) throw new MyError(404, 'Board not found');

        // User not logged in
        if (!req.user) {
            // Is the board public ?
            if (!board.visibility === 'public') throw new MyError(401, 'You are not allowed to access this team. Please sign in and try again.');
            else next();
        } else {
            // Is the user a board member ?
            let member = board.members.find(member => req.user._id.toString() === member._id.toString());
            if (member) next();

            else {
                // Is the user a team member and board not private ?
                member = board.teams.members.find(member => req.user._id.toString() === member._id.toString());
                if (member && !board.visibility === 'private') {
                    next();
                } else {
                    throw new MyError(403, 'You can\'t access this board.');
                }
            }
        }
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { canSee, isMember, isAdmin };

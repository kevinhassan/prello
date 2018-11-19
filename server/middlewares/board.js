const Board = require('../models/Board');
const MyError = require('../util/error');

/**
 * Check if the user can edit the board
 */
const canEdit = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorized, you need to be authenticated');
        const board = await Board.findById(req.params.boardId).select('members admins');
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        const member = board.members.find(member => req.user._id.toString() === member._id.toString());
        if (!member) throw new MyError(403, 'Forbidden, you can not edit this board');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
* Check if the user can manage the board and admin
*/
const canManage = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorized, you need to be authenticated');
        const board = await Board.findById(req.params.boardId).select('admins');

        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        const member = board.admins.find(admin => req.user._id.toString() === admin._id.toString());
        if (!member) throw new MyError(403, 'Forbidden, you can not manage this board');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } else if (e.status) {
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

        if (!board) {
            throw new MyError(404, 'Board not found');
        }

        // Is the board public ?
        if (board.visibility === 'public') {
            next();
            return;
        }

        // User not logged in
        if (!req.user) {
            throw new MyError(401, 'You are not allowed to access this team. Please sign in and try again.');
        } else {
            // Is the user a board member ?
            let member = board.members.find(member => req.user._id.toString() === member._id.toString());
            if (member) {
                next();
                return;
            }

            // Is the user a team member and board not private ?
            member = board.teams.map(t => t.members.find(member => req.user._id.toString() === member._id.toString()));
            if (member && !board.visibility === 'private') {
                next();
            } else {
                throw new MyError(403, 'You can\'t access this board.');
            }
        }
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Board not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
 * Check if the user can see the board (socket syntax)
 */
const canSeeViaSocket = async (boardId, user) => {
    try {
        const board = await Board.findById(boardId).select('members teams visibility').populate([
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

        // Is the board public ?
        if (board.visibility === 'public') {
            return true;
        }

        // User not logged in
        if (!user) {
            throw new MyError(401, 'You are not allowed to access this board. Please sign in and try again.');
        } else {
            // Is the user a board member ?
            let member = board.members.find(member => user._id.toString() === member._id.toString());
            if (member) return true;

            // Is the user a team member and board not private ?
            member = board.teams.map(t => t.members.find(member => user._id.toString() === member._id.toString()));
            if (member && !board.visibility === 'private') {
                return true;
            }
            throw new MyError(403, 'You can not access this board.');
        }
    } catch (e) {
        if (e.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        } else if (e.status) {
            throw e;
        }
        throw new MyError(500, 'Internal server error');
    }
};

module.exports = {
    canSee, canEdit, canManage, canSeeViaSocket
};

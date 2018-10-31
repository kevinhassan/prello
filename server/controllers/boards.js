const boardController = {};
const MyError = require('../util/error');
const Board = require('../models/Board');
const User = require('../models/User');

/**
 * GET /boards/:boardId
 *
 */
boardController.get = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate([{
            path: 'lists',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        }, {
            path: 'labels'
        }]);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        return board;
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /boards/:boardId
 */
boardController.putLists = async (boardId, lists) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        board.lists = lists;
        await board.save();
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect Query');
        }
        if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /boards
 * Create the board with the creator like admin
 * Admin is automatically the member of the team
 */
boardController.createBoard = async (owner, data) => {
    try {
        const board = new Board();
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        board.name = data.name;
        board.visibility = data.visibility;
        board.owner = owner;
        // Owner is also the member of the board
        await board.save();
        return board._id;
    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect Query');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /board/:boardId/visibility
 * Change the visibility of the board
 */
boardController.changeVisibility = async (boardId, owner, visibility) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        // if the user is not the owner return error unauthorized
        if (owner.toString() !== board.owner.toString()) throw new MyError(403, 'UnAuthorized user');
        board.visibility = visibility;
        await board.save();
    } catch (err) {
        if (err.status) throw err;
        if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect Query');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * POST /board/:boardId/members
 * Add member to the board (only for owner)
 */
boardController.addMemberWithMail = async (boardId, userId, email) => {
    try {
        const member = await User.findOne({ email }).select({ _id: 1 });
        if (!member) throw new MyError(404, 'Member to add unknown');
        await boardController.addMember(boardId, userId, member._id);
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

boardController.addMember = async (boardId, owner, userId) => {
    try {
        const board = await Board.findById(boardId).select({ owner: 1 });
        if (!board) throw new MyError(404, 'Board not found');
        // if the user is not the owner return error unauthorized
        if (owner.toString() !== board.owner.toString()) throw new MyError(403, 'UnAuthorized user');

        const newBoard = await Board.updateOne({ _id: boardId }, { $push: { members: userId } }, { new: true });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * DELETE /board/:id/members/:id
 * Remove a member from the board (only for owner)
 * Remove him from :
 * - the members collection
 * - all cards froms board's lists where is assignee (?)
 *
 */
boardController.removeMember = async (boardId, memberId, owner) => {
    try {
        const board = await Board.findById(boardId).select({ owner: 1 }).catch((async () => { throw new MyError(404, 'Board not found'); }));
        // if the user is not the owner return error unauthorized
        if (owner.toString() !== board.owner.toString()) throw new MyError(403, 'UnAuthorized user');

        const newBoard = await Board.updateOne({ _id: boardId }, { $pull: { members: memberId } }, { new: true }).catch((async () => { throw new MyError(404, 'Member not found'); }));
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /board/:id/teams
 * Add team to the board (only for owner)
 */
boardController.addTeam = async (boardId, teamId, owner) => {
    try {
        const board = await Board.findById(boardId).select({ owner: 1 }).catch((async () => { throw new MyError(404, 'Board not found'); }));
        // if the user is not the owner return error unauthorized
        if (owner.toString() !== board.owner.toString()) throw new MyError(403, 'UnAuthorized user');

        const newBoard = await Board.updateOne({ _id: boardId }, { $push: { teams: teamId } }, { new: true }).catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * DELETE /board/:id/teams
 * Remove the board's team (only for owner)
 */
boardController.removeTeam = async (boardId, teamId, owner) => {
    try {
        const board = await Board.findById(boardId).select({ owner: 1 }).catch((async () => { throw new MyError(404, 'Board not found'); }));
        // if the user is not the owner return error unauthorized
        if (owner.toString() !== board.owner.toString()) throw new MyError(403, 'UnAuthorized user');
        const newBoard = await Board.updateOne({ _id: boardId }, { $pull: { teams: teamId } }, { new: true }).catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
module.exports = boardController;

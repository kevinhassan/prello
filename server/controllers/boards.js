const boardController = {};
const teamController = require('./teams');
const userController = require('./users');
const cardController = require('./cards');

const MyError = require('../util/error');
const Board = require('../models/Board');
const User = require('../models/User');
const Helpers = require('../helpers');
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
        }, { path: 'teams' }]);
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
        board.name = data.name;
        board.visibility = data.visibility;
        board.owner = owner;
        // Owner is also the member of the board
        await board.save();
        return board._id;
    } catch (err) {
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
boardController.changeVisibility = async (boardId, actualUser, visibility) => {
    try {
        const board = await Board.findById(boardId).select('members');
        if (!board) {
            throw new MyError(404, 'Board not found');
        }

        const isAdmin = await Helpers.isAdmin(actualUser, board.members);
        if (!isAdmin) throw new MyError(403, 'Forbidden access');
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
 * Add member to the board (only for admins)
 */
boardController.addMemberWithMail = async (boardId, userId, email) => {
    try {
        const board = await Board.findById(boardId).select('members');
        if (!board) throw new MyError(404, 'Board not found');

        const isAdmin = await Helpers.isAdmin(userId, board.members);
        if (!isAdmin) throw new MyError(403, 'Forbidden access');

        const member = await User.findOne({ email }).select('_id');
        if (!member) throw new MyError(404, 'Member to add unknown');

        // member have to be different that currentUser
        if (userId.toString() === member._id.toString()) throw new MyError(403, 'Forbidden');

        // add the board to the member
        await userController.joinBoard(member._id, boardId);
        const newBoard = await Board.updateOne({ _id: boardId }, { $addToSet: { members: { _id: member._id } } });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * DELETE /board/:id/members/:id
 * Remove a member from the board (only for admins)
 * Remove him from :
 * - the members collection
 * - all cards from board's lists where is assignee
 * check if at least one member is admin before delete him (TODO)
 *
 */
boardController.removeMember = async (boardId, memberId, actualUser) => {
    try {
        const board = await Board.findById(boardId)
            .select(['members', 'lists'])
            .populate({
                path: 'lists',
                select: 'cards',
                populate: {
                    path: 'cards',
                    select: 'members _id',
                    populate: {
                        path: 'members',
                        select: '_id'
                    }
                }
            });
        if (!board) throw new MyError(404, 'Board not found');
        const isAdmin = await Helpers.isAdmin(actualUser, board.members);
        if (!isAdmin) throw new MyError(403, 'Forbidden access');

        // remove the member from all cards
        await Promise.all(board.lists.map(async (list) => {
            Promise.all(list.cards.map(card => cardController.removeMember(card._id, memberId)));
        }));

        // remove the member from the board and update with the new lists
        const newBoard = await board.updateOne({ $pull: { members: { _id: memberId } } }, { new: true }).catch((async () => { throw new MyError(404, 'Member not found'); }));
        // remove the board from the member
        await userController.leaveBoard(memberId, boardId);
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /board/:id/teams
 * Add team to the board (only for admins)
 */
boardController.addTeam = async (boardId, teamId, actualUser) => {
    try {
        const board = await Board.findById(boardId).select('members').catch(async () => { throw new MyError(404, 'Board not found'); });
        if (!board) throw new MyError(404, 'Board not found');

        const isAdmin = await Helpers.isAdmin(actualUser, board.members);
        if (!isAdmin) throw new MyError(403, 'Forbidden access');

        await teamController.addBoard(board._id, teamId);
        const newBoard = await Board.updateOne({ _id: boardId }, { $addToSet: { teams: teamId } }, { new: true }).catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * DELETE /board/:id/teams
 * Remove the board's team (only for admins)
 */
boardController.removeTeam = async (boardId, teamId, actualUser) => {
    try {
        const board = await Board.findById(boardId).select('members').catch((async () => { throw new MyError(404, 'Board not found'); }));

        const isAdmin = await Helpers.isAdmin(actualUser, board.members);
        if (!isAdmin) throw new MyError(403, 'Forbidden access');

        await teamController.removeBoard(board._id, teamId);
        const newBoard = await Board.updateOne({ _id: boardId }, { $pull: { teams: teamId } }, { new: true }).catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
module.exports = boardController;

const boardController = module.exports;
const teamController = require('./teams');
const userController = require('./users');
const cardController = require('./cards');

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
                model: 'Card',
                populate: {
                    path: 'list',
                    select: 'name'
                }
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
boardController.changeVisibility = async (boardId, visibility) => {
    try {
        await Board.updateOne({ _id: boardId }, { visibility });
    } catch (err) {
        if (err.status) throw err;
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
boardController.addMemberWithMail = async (boardId, email) => {
    try {
        const user = await userController.findUserWithEmail(email);

        // add the board to the member
        await userController.joinBoard(user._id, boardId);
        const newBoard = await Board.findByIdAndUpdate(boardId, { $addToSet: { members: { _id: user._id } } });
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
 * TODO: check if at least one member is admin before delete him
 *
 */
boardController.removeMember = async (boardId, memberId) => {
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

        // remove the member from all cards
        await Promise.all(board.lists.map(async (list) => {
            Promise.all(list.cards.map(card => cardController.removeMember(card._id, memberId)));
        }));

        // remove the member from the board and update with the new lists
        const newBoard = await board.updateOne({ $pull: { members: { _id: memberId } } }, { new: true })
            .catch((async () => { throw new MyError(404, 'Member not found'); }));
        // remove the board from the member
        await userController.leaveBoard(memberId, boardId);
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /board/:id/members/:id
 * Change admin access of the member
 * TODO: check if at least 1 admin before remove access right
 */
boardController.changeAccess = async (boardId, memberId, accessRight) => {
    try {
        const board = await Board.findById(boardId).select(['members']);

        // change the member access right
        let memberFound = false;
        await board.members.map((member) => {
            if (member._id.toString() === memberId.toString()) {
                member.isAdmin = accessRight;
                memberFound = true;
            }
            return member;
        });
        if (!memberFound) throw new MyError(404, 'Member not found');
        await board.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /board/:id/teams
 * Add team to the board (only for admins)
 */
boardController.addTeam = async (boardId, userId, teamId) => {
    try {
        await teamController.addBoard(boardId, teamId);
        const newBoard = await Board.updateOne({ _id: boardId },
            { $addToSet: { teams: teamId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
        await userController.joinBoard(userId, boardId);
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
boardController.removeTeam = async (boardId, teamId) => {
    try {
        await teamController.removeBoard(boardId, teamId);
        const newBoard = await Board.updateOne({ _id: boardId },
            { $pull: { teams: teamId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

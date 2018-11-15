const socket = require('../socket');
const MyError = require('../util/error');

const teamController = require('./teams');
const userController = require('./users');
const cardController = require('./cards');
const listController = require('./lists');

const Board = require('../models/Board');
const User = require('../models/User');
const Label = require('../models/Label');

// ========================= //
// ===== Get functions ===== //
// ========================= //

/**
 * Get a board with lists and cards populated.
 */
exports.getBoard = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate([{
            path: 'lists',
            populate: {
                path: 'cards',
                model: 'Card',
                populate: [{
                    path: 'list',
                    select: 'name'
                },
                {
                    path: 'labels',
                    select: ['color', 'name']
                }
                ]
            }
        }, {
            path: 'labels'
        }, {
            path: 'teams'
        }, {
            path: 'members',
            select: ['-password']
        }, {
            path: 'admins',
            select: '_id'
        }]);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        return board;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};
exports.getBoards = async (userId) => {
    try {
        const boards = await User.findById(userId).select('boards')
            .populate({
                path: 'boards',
                select: ['isArchived', 'name', 'visibility'],
                populate: [
                    {
                        path: 'lists',
                        select: 'cards'
                    }, {
                        path: 'members',
                        select: 'initials'
                    }, {
                        path: 'teams',
                        select: 'name'
                    }, {
                        path: 'admins',
                        select: '_id'
                    }
                ]
            });
        return boards;
    } catch (err) {
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Get a board labels.
 */
exports.getLabels = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate([{
            path: 'labels'
        }]);

        if (!board) throw new MyError(404, 'Board not found');
        return board;
    } catch (err) {
        if (err.status) throw err;
        if (err.name === 'CastError') throw new MyError(404, 'Board not found');
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// ===== Put functions ==== //
// ======================== //

/**
 *
 */
exports.putLists = async (boardId, lists) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        board.lists = lists;
        await board.save();

        socket.updateClientsOnBoard(board._id);
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        } else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Change admin access of the member
 * TODO: check if at least 1 admin before remove access right
 */
exports.putAccess = async (boardId, memberId, isAdmin) => {
    try {
        const memberFound = User.findById(memberId);
        if (!memberFound) throw new MyError(404, 'Member not found');
        if (isAdmin) {
            // add to admin collection
            await Board.updateOne({ _id: boardId }, { $addToSet: { admins: memberId } });
        } else {
            await Board.updateOne({ _id: boardId }, { $pull: { admins: memberId } });
        }
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Change the visibility of the board
 */
exports.putVisibility = async (boardId, visibility) => {
    try {
        await Board.updateOne({ _id: boardId }, { visibility });
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Change the isArchived value of the board
 */
exports.putIsArchived = async (boardId, isArchivedValue) => {
    try {
        await Board.updateOne({ _id: boardId }, { isArchived: isArchivedValue });
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Change the name of the board
 */
exports.putName = async (boardId, name) => {
    try {
        await Board.updateOne({ _id: boardId }, { name });
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Change the github repo
 */
exports.putGithubRepo = async (boardId, name, url) => {
    try {
        await Board.updateOne({ _id: boardId }, { githubRepo: { name, url } });
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

// ========================== //
// ===== Post functions ===== //
// ========================== //

/**
 * Create the board with the creator as admin.
 * Admin is automatically the member of the team.
 */
exports.postBoard = async (owner, data) => {
    try {
        const board = new Board();
        board.name = data.name;
        board.visibility = data.visibility;
        // Owner is also member of the board
        board.owner = owner;
        await userController.putBoard({ userId: owner._id, board });
        await board.save();

        const boardCreated = this.getBoard(board._id);

        return boardCreated;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.postList = async (boardId, name) => {
    try {
        const board = Board.findById(boardId).select('lists');
        if (!board) throw new MyError(404, 'Board not found');

        const newList = await listController.createList(boardId, name);
        await Board.findOneAndUpdate({ _id: boardId }, { $addToSet: { lists: newList._id } }, { new: true });
        return newList;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        } else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add team to the board (only for admins)
 * Board already exits
 */
exports.postTeam = async (boardId, teamId) => {
    try {
        await teamController.addBoard(teamId, boardId);
        const newBoard = await Board.updateOne({ _id: boardId },
            { $addToSet: { teams: teamId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add member to the board with mail.
 */
exports.postMemberWithMail = async (boardId, email) => {
    try {
        const member = await userController.findMemberWithMail(email);
        const board = await this.getBoard(boardId);

        if (board.members.some(m => m._id.toString() === member._id.toString())) {
            throw new MyError(409, `${email} is already on the board`);
        }
        await userController.postBoard(member._id, boardId);
        const newBoard = await Board.updateOne({ _id: boardId }, { $addToSet: { members: { _id: member._id } } });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add member to the board with username.
 */
exports.postMemberWithUsername = async (boardId, username) => {
    try {
        const member = await userController.findMemberWithUsername(username);
        const board = await this.getBoard(boardId);

        if (board.members.some(m => m._id.toString() === member._id.toString())) {
            throw new MyError(409, `${username} is already on the board`);
        }
        const user = await userController.postBoard(member._id, boardId);
        await Board.updateOne({ _id: boardId }, { $addToSet: { members: { _id: member._id } } });
        return user;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};


/**
 * Create a new label.
 */
exports.postLabel = async (data) => {
    try {
        const label = new Label();
        const board = await Board.findById(data.boardId);
        if (!board) {
            throw new MyError(404, 'Not found, the specified board doesn\'t exist');
        }

        label.name = data.name;
        label.color = data.color;
        label.board = { _id: data.boardId };
        await label.save();

        board.labels.push(label);
        await board.save();

        socket.updateClientsOnBoard(data.boardId);

        return label;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal server error');
    }
};

// ============================ //
// ===== Delete functions ===== //
// ============================ //

/**
 * Remove a member from the board (only for admins)
 * Remove him from :
 * - the members collection
 * - all cards from board's lists where is assignee
 * TODO: check if at least one member is admin before delete him
 *
 */
exports.deleteMember = async (boardId, memberId) => {
    try {
        await exports.removeMember(boardId, memberId);

        // remove the board from the member
        await userController.removeBoard(memberId, boardId);
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Remove the board's team (only for admins)
 */
exports.deleteTeam = async (boardId, teamId) => {
    try {
        await teamController.deleteBoard(teamId, boardId);
        const newBoard = await Board.updateOne({ _id: boardId },
            { $pull: { teams: teamId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add list to the boaard
 */
exports.addList = async (boardId, listId) => {
    try {
        const board = await Board.findById(boardId).select('lists');
        if (!board) throw new MyError(404, 'Board not found');
        const newBoard = await board.updateOne({ $addToSet: { lists: listId } }, { new: true });
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        } else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Remove member of the board
 */
exports.removeMember = async (boardId, memberId) => {
    try {
        const board = await Board.findById(boardId)
            .select(['members', 'lists'])
            .populate({
                path: 'lists',
                select: 'cards',
                populate: {
                    path: 'cards',
                    select: 'members',
                    populate: {
                        path: 'members',
                        select: '_id'
                    }
                }
            });

        // remove the member from all cards
        await Promise.all(board.lists.map(async (list) => {
            Promise.all(list.cards.map(card => cardController.deleteMember(card._id, memberId)));
        }));

        // remove the member from the board and update with the new lists
        const newBoard = await board.updateOne({
            $pull: { members: memberId, admins: memberId }
        },
        { new: true }).catch((async () => {
            throw new MyError(404, 'Member not found');
        }));
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        } else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};
exports.removeTeam = async (boardId, teamId) => {
    try {
        const newBoard = await Board.findOneAndUpdate({ _id: boardId },
            { $pull: { teams: teamId } }, { new: true });
        if (!newBoard) throw new MyError(404, 'Board not found');
        return newBoard;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        } else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};

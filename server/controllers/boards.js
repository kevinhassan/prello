const boardController = {};
const MyError = require('../util/error');
const Board = require('../models/Board');

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
module.exports = boardController;

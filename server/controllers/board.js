const boardController = {};
const MyError = require('../util/error');
const Board = require('../models/Board');
/**
 * GET /board/{id}
 *
 */
boardController.get = async (boardId) => {
    const error = new Error('Internal Server Error');
    error.status = 500;
    try {
        const board = await Board.findById(boardId).populate([{
            path: 'lists',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        }, {
            path: 'privacy',
            select: 'name'
        }, {
            path: 'labels'
        }]);
        if (!board) {
            error.message = 'Board not found';
            error.status = 404;
            throw error;
        }
        return board;
    } catch (e) {
        console.log(e);
        throw error;
    }
};

boardController.putLists = async (boardId, lists) => {
    const error = new Error('Internal Server Error');
    error.status = 500;
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throw new MyError(404, 'Board not found');
        }
        board.lists = lists;
        board.save((err) => {
            if (err) throw error;
        });
    } catch (e) {
        console.log(e);
        if (!e.status) {
            throw new MyError(500, 'Internal Server Error');
        }
        throw e;
    }
};

module.exports = boardController;

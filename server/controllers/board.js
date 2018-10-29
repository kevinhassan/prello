const boardController = {};
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
        await Board.findById(boardId, (err, board) => {
            if (board) {
                board.lists = lists;
                board.save((err) => {
                    if (err) throw err;
                });
            } else {
                throw err;
            }
        });
    } catch (e) {
        throw error;
    }
};

module.exports = boardController;

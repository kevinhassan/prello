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

module.exports = boardController;

const MyError = require('../util/error');
const BoardController = require('./boards');

// ========================= //
// ===== Get functions ===== //
// ========================= //

/**
 * Get a board with lists and cards populated.
 */
exports.getBoard = async () => {
    try {
        const board = await BoardController.getBoard('b00000000001');
        return board;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

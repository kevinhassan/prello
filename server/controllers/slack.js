const request = require('request');
const MyError = require('../util/error');
const BoardController = require('./boards');

// ========================= //
// ===== Get functions ===== //
// ========================= //

/**
 * Get a board with lists and cards populated.
 */
exports.getBoard = async (req) => {
    try {
        const board = await BoardController.getBoard('b00000000001');
        console.log('cc');
        console.log(req.param('response_url'));
        request.post(req.param('response_url'),
            {
                headers: { 'Content-Type': 'application/json' },
                json: { text: `The board ${board.name} has ${board.lists.length} lists` },
                method: 'POST'
            });
        return board;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

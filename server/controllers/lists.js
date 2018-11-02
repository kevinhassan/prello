const listController = {};
const MyError = require('../util/error');
const List = require('../models/List');
const Board = require('../models/Board');

/**
 * POST /lists
 */
listController.createList = async (data) => {
    try {
        const list = new List();
        list.name = data.name;
        list.boardId = data.boardId;
        await list.save();

        const board = await Board.findById(data.boardId);
        board.lists.push(list);
        await board.save();

        return list;
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

module.exports = listController;

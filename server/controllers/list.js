const listController = {};
const MyError = require('../util/error');
const List = require('../models/List');

/**
 * POST /board/:boardId/list
 */
listController.createBoard = async (data) => {
    try {
        const list = new List();
        if (!list) {
            throw new MyError(404, 'List not found');
        }
        list.name = data.name;
        list.boardId = data.boardId;
        await list.save();
        return list._id;
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
module.export = listController;

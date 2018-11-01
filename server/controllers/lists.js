const listController = {};
const MyError = require('../util/error');
const List = require('../models/List');

/**
 * POST /board/:boardId/list
 */
listController.createList = async (name, boardId) => {
    try {
        const list = new List();
        if (!list) {
            throw new MyError(404, 'List not found');
        }
        list.name = name;
        list.boardId = boardId;
        await list.save();
        return list;
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
 * GET /boards/:boardId/:listId
 *
 */
listController.get = async (listId) => {
    try {
        const list = await List.findById(listId).populate([{
            path: 'lists',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        }, {
            path: 'labels'
        }]);
        if (!list) {
            throw new MyError(404, 'List not found');
        }
        return list;
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

module.exports = listController;

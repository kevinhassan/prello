const listController = module.exports;
const boardController = require('../controllers/boards');
const socket = require('../socket');
const MyError = require('../util/error');
const List = require('../models/List');

// ======================== //
// ==== Get functions ===== //
// ======================== //
// ======================== //

listController.getListByCard = async (cardId) => {
    try {
        const list = await List.findOne({ cards: { _id: cardId } });
        if (!list) throw new MyError(404, 'List not found');
        return list;
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(422, 'Incorrect query');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal server error');
    }
};

// ==== Post functions ==== //
// ======================== //
listController.postList = async (data) => {
    try {
        const list = new List({
            name: data.name,
            boardId: data.boardId,
        });
        await list.save();
        await boardController.addList(data.boardId, list._id);
        socket.updateClientsOnBoard(data.boardId);

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
/**
 * Add card to the list
 */
listController.addCard = async (listId, cardId) => {
    try {
        const list = List.findById(listId).select('cards');
        if (!list) throw new MyError(404, 'List not found');
        const newList = await List.updateOne({ _id: listId }, { $addToSet: { cards: cardId } }, { new: true });
        return newList;
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        }
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Update card in the list
 */
listController.updateCard = async (listId, cardId) => {
    try {
        const list = List.findById(listId);
        if (!list) throw new MyError(404, 'List not found');
        return newList;
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

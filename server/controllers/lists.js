const listController = {};
const boardController = require('../controllers/boards');
const socket = require('../socket');
const MyError = require('../util/error');
const List = require('../models/List');

// ======================== //
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

module.exports = listController;

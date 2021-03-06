const MyError = require('../util/error');

const List = require('../models/List');

const cardController = require('../controllers/cards');

// ======================== //
// ==== Get functions ===== //
// ======================== //

exports.getList = async (listId) => {
    try {
        const list = await List.findById(listId);
        if (!list) throw new MyError(404, 'List not found');
        return list;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.getListByBoardId = async (boardId) => {
    try {
        const lists = await List.find({ 'board._id': boardId }).populate('cards');
        return lists;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// ==== Post functions ==== //
// ======================== //
exports.postCard = async (listId, name) => {
    try {
        const list = await List.findById(listId).select('cards');
        if (!list) throw new MyError(404, 'List not found');

        const newCard = await cardController.createCard(name, listId);
        await List.findOneAndUpdate({ _id: listId },
            { $addToSet: { cards: { _id: newCard._id } } },
            { new: true });
        return newCard;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        } else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add card to the list at the specified index
 */
exports.addCard = async (index, listId, cardId) => {
    try {
        const list = await List.findById(listId);
        if (!list) throw new MyError(404, 'List not found');

        if (list.cards) list.cards.splice(index, 0, cardId);
        else list.cards = [{ _id: cardId }];
        await list.save();

        return list;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        } else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.createList = async (boardId, name) => {
    try {
        const list = new List();
        list.name = name;
        list.board = { _id: boardId };
        const newList = await list.save();
        return newList;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};


// ======================= //
// ==== Put functions ==== //
// ======================= //
/**
 * Set list archived
 */
exports.archiveList = async (listId, isArchived) => {
    try {
        const list = await List.findById(listId);
        if (!list) throw new MyError(404, 'List not found.');

        list.isArchived = isArchived;
        await list.save();

        return list;
    } catch (err) {
        if (err.status) throw err;
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query.');
        }
        if (err.name === 'CastError') {
            throw new MyError(404, 'List not found.');
        }
        throw new MyError(500, 'Internal server error.');
    }
};

exports.putName = async (listId, name) => {
    try {
        const list = await List.findById(listId);
        if (!list) throw new MyError(404, 'List not found.');

        list.name = name;
        await list.save();

        return list;
    } catch (err) {
        if (err.status) throw err;
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query.');
        }
        if (err.name === 'CastError') {
            throw new MyError(404, 'List not found.');
        }
        throw new MyError(500, 'Internal server error.');
    }
};

// ========================== //
// ==== Delete functions ==== //
// ========================== //
exports.removeCard = async (data) => {
    try {
        const list = await List.findById(data.listId);
        const cardsUpdated = list.cards.filter(card => card._id.toString() !== data.cardId.toString());
        list.cards = cardsUpdated;

        await list.save();

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

const MyError = require('../util/error');
const socket = require('../socket');

const Card = require('../models/Card');

const listController = require('../controllers/lists');

// ============================ //
// ===== Delete functions ===== //
// ============================ //

/**
 * Remove the member from the card
 * TODO: use REST parameter to remove multiple members id
 */
exports.deleteMember = async (cardId, memberId) => {
    try {
        return await Card.findByIdAndUpdate(cardId,
            { $pull: { members: memberId } }, { new: true }).catch(async () => {
            throw new MyError(404, 'Card not found');
        });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

// ========================== //
// ===== Post functions ===== //
// ========================== //

/**
 * Create a new card.
 */
cardController.postCard = async (data) => {
    try {
        const card = new Card();

        const list = await List.findById(data.list);
        if (!list) {
            throw new MyError(422, 'Incorrect query, the specified list doesn\'t exist');
        }
        card.name = data.name;
        card.list = data.list;
        list.cards.push(card._id);

        await list.save();
        await card.save();
        socket.updateClientsOnBoard(list.boardId);

        return card;
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
 * Add an existing label to the card
 */
cardController.addLabel = async (data) => {
    try {
        const card = await Card.findById(data.cardId);
        if (!card) {
            throw new MyError(422, 'Incorrect query, the specified card doesn\'t exist');
        }

        card.labels.push(data.labelId);

        await card.save();

        // Update clients on board
        const list = await List.findById(card.list._id);
        socket.updateClientsOnBoard(list.boardId);

        return card;
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

// ======================== //
// ===== Put functions ==== //
// ======================== //

/**
 * Add the member to the card
 * TODO: use REST parameter to add multiple members id
 */
exports.putMember = async (cardId, memberId) => {
    try {
        return await Card.findByIdAndUpdate(cardId, { $addToSet: { members: memberId } },
            { new: true }).catch(async () => {
            throw new MyError(404, 'Card not found');
        });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

/**
 * Change card description
 */
exports.putDescription = async (cardId, description) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) throw new MyError(404, 'Card not found.');

        card.description = description;
        await card.save();

        const newList = await listController.getList(card.list);
        // update board via socket
        socket.updateClientsOnBoard(newList.board);

        return card;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query.');
        } else if (err.name === 'CastError') {
            throw new MyError(404, 'Card not found.');
        }
        throw new MyError(500, 'Internal server error.');
    }
};

exports.createCard = async (name, listId) => {
    try {
        const newCard = new Card();
        newCard.name = name;
        newCard.list = listId;
        await newCard.save();
        return newCard;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query.');
        }
        throw new MyError(500, 'Internal server error.');
    }
};

// =========================== //
// ===== Delete functions ==== //
// =========================== //
cardController.deleteLabel = async (data) => {
    try {
        return await Card.findByIdAndUpdate(data.cardId,
            { $pull: { labels: data.labelId } }, { new: true }).catch(async () => {
            throw new MyError(404, 'Card not found');
        });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

module.exports = cardController;

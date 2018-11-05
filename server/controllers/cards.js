const cardController = {};
const Card = require('../models/Card');
const MyError = require('../util/error');
const socket = require('../socket');
const List = require('../models/List');

// ============================ //
// ===== Remove functions ===== //
// ============================ //

/**
 * Remove the member from the card
 * TODO: use REST parameter to remove multiple members id
 */
cardController.removeMember = async (cardId, memberId) => {
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
cardController.createCard = async (data) => {
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


// ======================== //
// ===== Put functions ==== //
// ======================== //

/**
 * Add the member to the card
 * TODO: use REST parameter to add multiple members id
 */
cardController.addMember = async (cardId, memberId) => {
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
cardController.putDescription = async (data) => {
    try {
        const card = await Card.findById(data.cardId);
        if (!card) throw new MyError(404, 'Card not found.');

        card.description = data.description;
        await card.save();

        // update board via socket
        const list = await List.findById(card.list);
        socket.updateClientsOnBoard(list.boardId);

        return card;
    } catch (err) {
        if (err.status === 404) {
            throw err;
        }
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query.');
        }
        if (err.name === 'CastError') {
            throw new MyError(404, 'Card not found.');
        }
        throw new MyError(500, 'Internal server error.');
    }
};

module.exports = cardController;

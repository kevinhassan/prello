const cardController = module.exports;
const Card = require('../models/Card');
const MyError = require('../util/error');
const socket = require('../socket');
const listController = require('../controllers/lists');

// ============================ //
// ===== Delete functions ===== //
// ============================ //

/**
 * Remove the member from the card
 * TODO: use REST parameter to remove multiple members id
 */
cardController.deleteMember = async (cardId, memberId) => {
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
        card.name = data.name;
        card.list = data.list;

        // add card to the list
        const list = await listController.addCard(data.list, card._id);

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
cardController.putMember = async (cardId, memberId) => {
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

        const newList = await listController.getListByCard(data.cardId);
        // update board via socket
        socket.updateClientsOnBoard(newList.boardId);

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

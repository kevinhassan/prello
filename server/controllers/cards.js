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
        socket.updateClientsOnBoard(newList.boardId);

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

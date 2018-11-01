const cardController = {};
const socket = require('../socket');
const MyError = require('../util/error');
const Card = require('../models/Card');
const List = require('../models/List');

/**
 * POST card
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

/**
 * PUT card description
 */
cardController.putDescription = async (data) => {
    try {
        const card = await Card.findById(data.cardId);
        if (!card) throw new MyError(404, 'Card not found.');

        card.description = data.description;
        await card.save();
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
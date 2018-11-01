const cardController = {};
const MyError = require('../util/error');
const Card = require('../models/Card');

/**
 * POST card
 */
cardController.createCard = async (data) => {
    try {
        const card = new Card();
        card.name = data.name;
        card.list = data.list;
        await card.save();
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

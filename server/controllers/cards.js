const cardController = {};
const MyError = require('../util/error');
const Card = require('../models/Card');

/**
 * PUT card description via socket
 */
cardController.putDescription = async (cardId, description) => {
    try {
        const card = await Card.findById(cardId).populate([{
            path: 'list'
        }]);
        if (!card) throw new MyError(404, 'Card not found.');

        card.description = description;
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

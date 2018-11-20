const Card = require('../models/Card');
const MyError = require('../util/error');

/**
 * Check if the user is member of the board
 */
const canEdit = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorized, you need to be authenticated');
        const card = await Card.findById(req.params.cardId).populate({
            path: 'list',
            populate: {
                path: 'board',
                select: 'members'
            }
        });
        if (!card) {
            throw new MyError(404, 'Card not found');
        }
        const member = card.list.board.members.find(member => member._id.toString() === req.user._id.toString());
        if (!member) throw new MyError(403, 'Forbidden, you can not edit this card');

        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Card not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { canEdit };

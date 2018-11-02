const cardController = {};
const Card = require('../models/Card');
const MyError = require('../util/error');

// remove the member from the card
// TODO: use REST parameter to remove multiple members id
cardController.removeMember = async (cardId, memberId) => {
    try {
        return await Card.findByIdAndUpdate(cardId, { $pull: { members: memberId } }, { new: true }).catch(async () => { throw new MyError(404, 'Card not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
// add the member to the card
// TODO: use REST parameter to add multiple members id
cardController.addMember = async (cardId, memberId) => {
    try {
        return await Card.findByIdAndUpdate(cardId, { $addToSet: { members: memberId } }, { new: true }).catch(async () => { throw new MyError(404, 'Card not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

module.exports = cardController;

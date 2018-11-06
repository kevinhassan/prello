const List = require('../models/List');
const MyError = require('../util/error');

/**
 * Check if the user is member of the board
 */
const canEdit = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorize user');
        const list = await List.findById(req.params.listId).populate({
            path: 'board',
            select: 'members'
        });
        if (!list) {
            throw new MyError(404, 'List not found');
        }
        const member = list.board.members.find(member => member._id.toString() === req.user._id.toString());
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'List not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { canEdit };

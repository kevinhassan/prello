const Team = require('../models/Team');
const MyError = require('../util/error');

/**
 * Check if the user is member of the team
 */
const isMember = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorize user');
        const team = await Team.findById(req.params.teamId).select('members');
        if (!team) {
            throw new MyError(404, 'Team not found');
        }
        const member = team.members.find(member => member._id.toString() === req.user._id.toString());
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Team not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
* Check if the user is member of the team and admin
*/
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorize user');
        const team = await Team.findById(req.params.teamId).select('members');

        if (!team) {
            throw new MyError(404, 'Team not found');
        }
        const member = team.members.find(member => member._id.toString() === req.user._id.toString() && member.isAdmin);
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Team not found' });
        } if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { isMember, isAdmin };

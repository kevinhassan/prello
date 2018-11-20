const Team = require('../models/Team');
const MyError = require('../util/error');

/**
 * Check if the user is member of the team
 */
const isMember = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorized, you need to be authenticated');
        const team = await Team.findById(req.params.teamId).select('members');
        if (!team) {
            throw new MyError(404, 'Team not found');
        }
        const member = team.members.find(member => req.user._id.toString() === member._id.toString());
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Team not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
* Check if the user can edit (he is admin ?)
*/
const canEdit = async (req, res, next) => {
    try {
        if (!req.user) throw new MyError(401, 'Unauthorized, you need to be authenticated');
        const team = await Team.findById(req.params.teamId).select('admins');

        if (!team) {
            throw new MyError(404, 'Team not found');
        }
        const member = team.admins.find(admin => req.user._id.toString() === admin._id.toString());
        if (!member) throw new MyError(403, 'Forbidden access');
        next();
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Team not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

/**
 * Check if the user can see the team (he is member or admin, or the team is visible)
 */
const canSee = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.teamId).select('isVisible admins members');
        if (!team) throw new MyError(404, 'Team not found');
        // User not logged in
        if (!req.user) {
            // Is the team visible ?
            if (!team.isVisible) throw new MyError(401, 'You are not allowed to access this team. Please sign in and try again.');
            else next();
        } else {
        // Is the user Admin or member ?
            const admin = team.admins.find(admin => req.user._id.toString() === admin._id.toString());
            const member = team.members.find(member => req.user._id.toString() === member._id.toString());

            if (member || admin) next();
            else {
            // Is the team visible ?
                if (!team.isVisible) {
                    throw new MyError(403, 'You can\'t access this team because it is not visible.');
                }
                next();
            }
        }
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(404).send({ error: 'Team not found' });
        } else if (e.status) {
            return res.status(e.status).send({ error: e.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { isMember, canEdit, canSee };

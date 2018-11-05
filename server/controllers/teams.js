const teamController = module.exports;
const MyError = require('../util/error');
const Team = require('../models/Team');
const User = require('../models/User');
const userController = require('../controllers/users');
const boardController = require('../controllers/boards');


teamController.addBoard = async (boardId, teamId) => {
    try {
        const team = await Team.findById(teamId);
        if (!team) throw new MyError(404, 'Team not found');

        await Team.updateOne({ _id: teamId },
            { $addToSet: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Board not found'); });
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(404, 'Team not found');
        }
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
teamController.removeBoard = async (boardId, teamId) => {
    try {
        const team = await Team.findById(teamId);
        if (!team) throw new MyError(404, 'Team not found');
        await Team.updateOne({ _id: teamId },
            { $pull: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Board not found'); });
    } catch (err) {
        if (err.name === 'CastError') {
            throw new MyError(404, 'Team not found');
        }
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * POST /teams
 * Create new team
 * The creator is member with admin right access
 * TODO: add Team to the creator collection
 */
teamController.createTeam = async (userId, data) => {
    try {
        const newTeam = new Team();
        newTeam.name = data.name;
        newTeam.isVisible = data.isVisible;
        // the creator is the first member of the team
        newTeam.members.push(userId);
        await newTeam.save();

        // add team to the team's creator
        await userController.joinTeam(userId, newTeam._id);
        return newTeam;
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
 * DELETE /teams/:teamId
 * Remove team
 */
teamController.removeTeam = async (userId, teamId) => {
    try {
        const team = await Team.findById(teamId).select(['boards', 'members']);
        if (!team) throw new MyError(404, 'Team not found');
        // remove members of the team
        await Promise.all(team.members.map(member => userController.leaveTeam(member._id, team._id)));
        // remove the team from all boards
        if (team.boards) {
            await Promise.all(team.boards.map(board => boardController.removeTeam(board._id, team._id)));
        }
        await team.delete();
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
 * POST /teams/:teamId/member
 * Add Member to the team
 */
teamController.addMemberWithMail = async (teamId, email) => {
    try {
        const user = await userController.findUserWithEmail(email);
        // add the board to the member
        await userController.joinTeam(user._id, teamId);
        const newTeam = await Team.findByIdAndUpdate(teamId, { $addToSet: { members: { _id: user._id } } });
        return newTeam;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /teams/:id/members/:id
 * Change admin access of the team member
 * TODO: check if at least 1 admin before remove access right
 */
teamController.changeAccess = async (teamId, memberId, accessRight) => {
    try {
        const team = await Team.findById(teamId).select(['members']);

        // change the member access right
        let memberFound = false;
        await team.members.map((member) => {
            if (member._id.toString() === memberId.toString()) {
                member.isAdmin = accessRight;
                memberFound = true;
            }
            return member;
        });
        if (!memberFound) throw new MyError(404, 'Member not found');
        await team.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * DELETE /teams/:id/members/:id
 * Remove a member from the team (only for admins)
 * Remove him from :
 * - the member's teams collection
 * - the team's members collection
 * TODO: check if at least one member is admin before delete him
 *
 */
teamController.removeMember = async (teamId, memberId) => {
    try {
        const team = await Team.findById(teamId);

        // remove the member from the team
        const newTeam = await team.updateOne({ $pull: { members: { _id: memberId } } }, { new: true })
            .catch((async () => { throw new MyError(404, 'Member not found'); }));

        // remove the team from the member
        await userController.leaveTeam(memberId, teamId);
        return newTeam;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
/**
 * PUT /teams/:id
 * Change team information
 */
teamController.changeInformation = async (teamId, data) => {
    try {
        const team = await Team.findById(teamId);
        const newTeam = await team.updateOne(data, { new: true })
            .catch((async () => { throw new MyError(404, 'Member not found'); }));

        return newTeam;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

module.exports = teamController;

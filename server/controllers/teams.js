const teamController = module.exports;
const MyError = require('../util/error');
const Team = require('../models/Team');
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
module.exports = teamController;

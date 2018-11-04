const teamController = {};
const MyError = require('../util/error');
const Team = require('../models/Team');


teamController.addBoard = async (boardId, teamId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $addToSet: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Board not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
teamController.removeBoard = async (boardId, teamId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $pull: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Board not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
teamController.createTeam = async (userId, data) => {
    try {
        const newTeam = new Team();
        newTeam.name = data.name;
        newTeam.isVisible = data.isVisible;
        // the creator is the first member of the team
        newTeam.members.push(userId);
        await newTeam.save();
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

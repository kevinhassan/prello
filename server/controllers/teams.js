const MyError = require('../util/error');

const Team = require('../models/Team');

const userController = require('../controllers/users');
const boardController = require('../controllers/boards');

// ======================== //
// ==== Post functions ==== //
// ======================== //
exports.postTeam = async (userId, data) => {
    try {
        const newTeam = new Team();
        newTeam.name = data.name;
        newTeam.isVisible = data.isVisible;
        // the creator is the first member of the team
        newTeam.members.push({ _id: userId, isAdmin: true });
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

// ======================== //
// === Delete functions === //
// ======================== //
exports.deleteTeam = async (teamId) => {
    try {
        const team = await Team.findOneAndDelete({ _id: teamId });
        // remove the team from all boards
        await Promise.all(team.boards.map(async board => boardController.removeTeam(board._id, teamId)));
        // remove all members from the team
        await Promise.all(team.members.map(async member => userController.leaveTeam(member._id, teamId)));
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
exports.deleteBoard = async (boardId, teamId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $pull: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
exports.addBoard = async (boardId, teamId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $addToSet: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

const MyError = require('../util/error');

const Team = require('../models/Team');

const userController = require('../controllers/users');
const boardController = require('../controllers/boards');

// ======================== //
// ===== Put functions ==== //
// ======================== //
/**
 * Change team's information
 */
exports.putTeam = async (teamId, data) => {
    try {
        const team = await Team.findById(teamId);
        team.name = data.name;
        team.description = data.description;
        const newTeam = await team.save();
        return newTeam;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};
/**
 * Change team's member right access
 */
exports.putMemberAccess = async (teamId, memberId, accessRight) => {
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
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
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
exports.deleteBoard = async (teamId, boardId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $pull: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
exports.addBoard = async (teamId, boardId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $addToSet: { boards: boardId } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};
exports.addMemberWithEmail = async (teamId, email) => {
    try {
        const user = await userController.findMemberWithMail(email);
        const team = await Team.findByIdAndUpdate(teamId, { $addToSet: { members: { _id: user._id, isAdmin: false } } });
        await userController.joinTeam(user._id, team._id);
        return team;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal Server Error');
    }
};

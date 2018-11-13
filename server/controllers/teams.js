const MyError = require('../util/error');

const Team = require('../models/Team');
const User = require('../models/User');

const userController = require('../controllers/users');
const boardController = require('../controllers/boards');

// ======================== //
// ===== Get functions ==== //
// ======================== //
exports.getTeam = async (teamId) => {
    try {
        const team = await Team.findById(teamId).populate([{
            path: 'boards',
            select: ['name', 'visibility', 'description', 'avatarUrl'],
            populate: [{
                path: 'lists',
                select: '_id cards',
                populate: {
                    path: 'cards',
                    select: '_id'
                }
            }, {
                path: 'teams',
                select: 'name'
            }, {
                path: 'members',
                select: 'initials username'
            }]
        }, {
            path: 'members',
            select: 'username initials fullName'
        }, {
            path: 'admins',
            select: 'username'
        }]);
        if (!team) throw new MyError(404, 'Team not found');
        return team;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect team id');
        }
        throw new MyError(500, 'Internal server error');
    }
};

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
exports.putMemberAccess = async (teamId, memberId, isAdmin) => {
    try {
        const member = User.findById(memberId);
        if (!member) throw new MyError(404, 'Member not found');

        if (isAdmin) {
            // add to admin collection
            await Team.updateOne({ _id: teamId }, { $addToSet: { admins: memberId } });
        } else {
            await Team.updateOne({ _id: teamId }, { $pull: { admins: memberId } });
        }
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};
exports.putVisibility = async (teamId, isVisible) => {
    try {
        const team = Team.findById(teamId);
        if (!team) throw new MyError(404, 'Team not found');
        await Team.updateOne({ _id: teamId }, { isVisible });
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
        newTeam.members.push(userId);
        newTeam.admins.push(userId);
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

exports.postMember = async (teamId, username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) throw new MyError(404, 'User not found');
        const team = await this.getTeam(teamId);
        if (team.members.some(m => m._id.toString() === user._id.toString())) {
            throw new MyError(409, 'User already in the team');
        }

        team.members.push(user);
        await userController.joinTeam(user._id, team._id);
        await team.save();
        return this.getTeam(teamId);
    } catch (err) {
        if (err.status) throw err;
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
        throw new MyError(500, 'Internal server error');
    }
};
exports.deleteBoard = async (teamId, boardId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $pull: { boards: { _id: boardId } } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};
exports.deleteMember = async (teamId, memberId) => {
    try {
        // remove the member from the team
        const newTeam = await Team.findByIdAndUpdate(teamId, { $pull: { members: { _id: memberId } } }, { new: true });

        // remove the team from the member
        await userController.leaveTeam(memberId, teamId);
        return newTeam;
    } catch (err) {
        if (err.status) throw err;
        if (err.name === 'CastError') {
            throw new MyError(404, 'Member not found');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.addBoard = async (teamId, boardId) => {
    try {
        await Team.updateOne({ _id: teamId },
            { $addToSet: { boards: { _id: boardId } } }, { new: true })
            .catch(async () => { throw new MyError(404, 'Team not found'); });
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

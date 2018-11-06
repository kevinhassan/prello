const MyError = require('../util/error');

const Team = require('../models/Team');

// ======================== //
// ==== Post functions ==== //
// ======================== //


// ======================== //
// === Delete functions === //
// ======================== //
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

const MyError = require('../util/error');
const BoardController = require('./boards');

function parse(stringToParse) {
    const retour = {
        /* board: '',
        card: '',
        keyword: '',
        list: '',
        user: '', */
    };
    const params = stringToParse.split(' ');
    params.forEach((param) => {
        if (param.charAt(0) === '#')retour.board = param.substring(1);
        else if (param.charAt(0) === '$')retour.card.push(param.substring(1));
        else if (param.charAt(0) === '%')retour.list.push(param.substring(1));
        else if (param.charAt(0) === '@')retour.user.push(param.substring(1));
        else if (param === params[0]) retour.keyword = param;
    });
    return retour;
}

/**
 * Get a board with lists and cards populated.
 */
exports.slackAction = async (stringToParse) => {
    try {
        const params = parse(stringToParse);
        const message = (params) => {
            if (params.keyword === 'add') return 'you have choose add action';
            if (params.keyword === 'duedate') return 'you have choose duedate action';
            if (params.keyword === 'remove') return 'you have choose remove action';
            return 'no valid key-word found. \nValid key-word are add, remove, due date ';
        };
        return message(params);
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

// ========================= //
// ===== Get functions ===== //
// ========================= //


/**
 * Get a board with lists and cards populated.
 */
exports.getBoard = async () => {
    try {
        const board = await BoardController.getBoard('b00000000001');
        return board;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'Board not found');
        }
        throw new MyError(500, 'Internal Server Error');
    }
};

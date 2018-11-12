const MyError = require('../util/error');
const BoardController = require('./boards');

function parse(stringToParse) {
    const retour = {
        board: '',
        cards: [],
        keyword: '',
        lists: [],
        users: []
    };
    const params = stringToParse.split(/(?=&|@|\$|%)/g);
    params.forEach((param) => {
        console.log(param);
        if (param.charAt(0) === '#')retour.board = param.substring(1).trim();
        else if (param.charAt(0) === '$')retour.cards.push(param.substring(1).trim());
        else if (param.charAt(0) === '%')retour.lists.push(param.substring(1).trim());
        else if (param.charAt(0) === '@')retour.users.push(param.substring(1).trim());
        else if (param === params[0]) retour.keyword = param.trim();
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
            if (params.keyword === 'add') {
                if (params.users.length !== 0 && params.cards.length !== 0) {
                    return `you have add ${params.users.toString()} to ${params.cards.toString()}`;
                }
                if (params.cards.length !== 0) {
                    return `you have add the cards ${params.cards.toString()}`;
                }
                return 'you have to choose a user';
            }
            if (params.keyword === 'duedate') {
                return 'the next task to do are : ';
            }
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

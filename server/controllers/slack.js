const MyError = require('../util/error');
const BoardController = require('./boards');
const ListController = require('./lists');
const CardController = require('./cards');

function parse(stringToParse) {
    const retour = {
        board: '',
        cards: [],
        keyword: '',
        list: '',
        users: []
    };
    console.log(stringToParse);
    const params = stringToParse.split(/(?=&|@|\$|%)/g);
    params.forEach((param) => {
        console.log(param);
        if (param.charAt(0) === '#')retour.board = param.substring(1).trim();
        else if (param.charAt(0) === '$')retour.cards.push(param.substring(1).trim());
        else if (param.charAt(0) === '%')retour.list = (param.substring(1).trim());
        else if (param.charAt(0) === '@')retour.users.push(param.substring(1).trim());
        else if (param === params[0]) retour.keyword = param.trim().split(' ');
    });
    return retour;
}

/**
 * Get a board with lists and cards populated.
 */
exports.slackAction = async (stringToParse) => {
    try {
        const params = parse(stringToParse);
        const board = await BoardController.getBoard('b00000000001');
        const listParam = board.lists.find(list => list.name === params.list);
        const message = async (params) => {
            if (params.keyword[0] === 'add') {
                if (params.users.length !== 0 && params.cards.length !== 0) {
                    return `you have add ${params.users.toString()} to ${params.cards.toString()}`;
                }
                if (params.cards.length !== 0) {
                    if (!listParam && !params.keyword.includes('-R')) {
                        return `the list ${params.list} does not exist`;
                    }
                    const list = async (listParam) => {
                        if (!listParam) {
                            const boar = (await BoardController.postList(board.id, params.list).lists); //.find(list => list.name === params.list);
                            return boar[boar.length];
                        }
                        return listParam;
                    };
                    console.log(list());
                    await params.cards.forEach(async (card) => {
                        await CardController.postCard({ name: card, list: await list().id });
                    });
                    return `you have add the cards ${params.cards.toString()} to ${params.list}`;
                }
                return 'you have to choose a user';
            }
            if (params.keyword[0] === 'duedate') {
                return 'the next task to do are : ';
            }
            if (params.keyword[0] === 'remove') return 'you have choose remove action';
            return 'no valid key-word found. \nValid key-word are add, remove, due date ';
        };
        return await message(params);
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

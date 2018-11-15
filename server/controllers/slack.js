const MyError = require('../util/error');
const BoardController = require('./boards');
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
    const params = stringToParse.split(/(?= [&@$%].*)/g);
    params.forEach((param) => {
        const trimedParam = param.trim();
        if (trimedParam.charAt(0) === '#')retour.board = trimedParam.substring(1);
        else if (trimedParam.charAt(0) === '$')retour.cards.push(trimedParam.substring(1));
        else if (trimedParam.charAt(0) === '%')retour.list = (trimedParam.substring(1));
        else if (trimedParam.charAt(0) === '@')retour.users.push(trimedParam.substring(1));
        else if (trimedParam === params[0]) retour.keyword = trimedParam.split(' ');
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
                    return `You have added ${params.users.toString()} to ${params.cards.toString()}.`;
                }
                if (params.cards.length !== 0) {
                    if (!listParam && !params.keyword.includes('-R')) {
                        return `The list ${params.list} does not exist.`;
                    }
                    if (!listParam) {
                        const list = (await BoardController.postList(board.id, params.list));
                        params.cards.forEach(async (card) => {
                            await CardController.postCard({ name: card, list: list._id });
                        });
                        return `You have added the cards ${params.cards.toString()} to the new list ${params.list}.`;
                    }
                    params.cards.forEach(async (card) => {
                        await CardController.postCard({ name: card, list: listParam._id });
                    });
                    return `You have add the cards ${params.cards.toString()} to ${params.list}.`;
                }
                return 'You have to choose a user.';
            }
            if (params.keyword[0] === 'duedate') {
                return 'The next task to do are : .';
            }
            if (params.keyword[0] === 'remove') {
                if (!listParam) {
                    return `The list ${params.list} does not exist.`;
                }
                await params.cards.forEach(async (card) => {
                    const findCard = await listParam.cards.filter(listCard => listCard.name === card);
                    findCard.forEach((cardToArchive) => {
                        CardController.archiveCard(cardToArchive._id);
                    });
                });
                return `You have archive the cards ${params.cards.toString()}.`;
            }
            return 'No valid key-word found. \nValid key-word are add, remove, duedate.';
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

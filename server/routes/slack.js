const axios = require('axios');
const passport = require('passport');
// const slackController = require('../controllers/slack');
const Slack = require('../middlewares/slack');
const Board = require('../models/Board');
const BoardController = require('../controllers/boards');
const CardController = require('../controllers/cards');

const VALIDKEYWORD = ['addCard', 'removeCard', 'getInfo', 'addLabel', 'removeLabel'];

function parse(stringToParse) {
    const retour = {
        board: '',
        cards: [],
        keyword: '',
        labels: [],
        list: '',
        users: []
    };
    const params = stringToParse.split(/(?= [#$&%@].*)/g);
    params.forEach((param) => {
        const trimedParam = param.trim();
        if (trimedParam.charAt(0) === '#' && retour.board === '')retour.board = trimedParam.substring(1);
        else if (trimedParam.charAt(0) === '$')retour.cards.push(trimedParam.substring(1));
        else if (trimedParam.charAt(0) === '&')retour.labels.push(trimedParam.substring(1));
        else if (trimedParam.charAt(0) === '%' && retour.list === '')retour.list = (trimedParam.substring(1));
        else if (trimedParam.charAt(0) === '@')retour.users.push(trimedParam.substring(1));
        else if (trimedParam === params[0]) retour.keyword = trimedParam.split(' ');
    });
    return retour;
}

async function addCard(params, board, listParam) {
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
    return 'You have to choose a card.';
}

async function addLabel(params, board, listParam) {
    if (params.cards.length === 0) {
        return 'You have to choose at least a card.';
    }
    if (params.labels.length === 0) {
        return 'You have to choose at least a label.';
    }
    if (!listParam) {
        return `The list ${params.list} does not exist.`;
    }
    await params.cards.forEach(async (card) => {
        const findCard = await listParam.cards.filter(listCard => listCard.name === card);
        const findLabel = await board.labels.filter(label => params.labels.includes(label.name));
        findCard.forEach((cardToLabel) => {
            findLabel.forEach((labelToAdd) => {
                CardController.addLabel({ cardId: cardToLabel._id, labelId: labelToAdd._id });
            });
        });
    });
    return `You have added the labels ${params.labels.toString()} to the cards ${params.cards.toString()}.`;
}

function getInfo(params, board, listParam) {
    let returnString = '';
    if (listParam && params.cards.length !== 0) {
        params.cards.forEach((card) => {
            const findCard = listParam.cards.filter(listCard => listCard.name === card);
            findCard.forEach((findedCard) => {
                returnString += `The card ${findedCard.name} description is ${findedCard.description} \n`;
            });
        });
    } else if (!listParam) {
        returnString += `The board ${board.name} have ${board.lists.length} list`;
        board.lists.forEach((list) => {
            returnString += ` \n-${list.name}`;
        });
    } else {
        returnString += `The list ${listParam.name} have ${listParam.cards.length} cards`;
        listParam.cards.forEach((card) => {
            returnString += ` \n-${card.name}`;
        });
    }
    return returnString;
}

async function removeCard(params, board, listParam) {
    if (params.cards.length === 0) {
        return 'You have to choose at least a card to archive.';
    }
    if (!listParam) {
        return `The list ${params.list} does not exist.`;
    }
    await params.cards.forEach(async (card) => {
        const findCard = await listParam.cards.filter(listCard => listCard.name === card);
        findCard.forEach((cardToArchive) => {
            CardController.archiveCard(cardToArchive._id);
        });
    });
    return `You have archived the cards ${params.cards.toString()}.`;
}

async function removeLabel(params, board, listParam) {
    if (params.cards.length === 0) {
        return 'You have to choose at least a card.';
    }
    if (params.labels.length === 0) {
        return 'You have to choose at least a label.';
    }
    if (!listParam) {
        return `The list ${params.list} does not exist.`;
    }
    await params.cards.forEach(async (card) => {
        const findCard = await listParam.cards.filter(listCard => listCard.name === card);
        const findLabel = await board.labels.filter(label => params.labels.includes(label.name));
        findCard.forEach((cardToLabel) => {
            findLabel.forEach((labelToAdd) => {
                CardController.deleteLabel({ cardId: cardToLabel._id, labelId: labelToAdd._id });
            });
        });
    });
    return `You have remove the labels ${params.labels.toString()} from the cards ${params.cards.toString()}.`;
}

module.exports = (router) => {
    router
        .post('/slack/', Slack.isTokenValid, async (req, res) => {
            try {
                res.status(204).send();
                console.log(req.param('token'));
                const params = parse(req.param('text'));
                console.log(params.board);
                const message = async (params) => {
                    const boardId = await Board.findOne({ name: params.board });
                    const board = await BoardController.getBoard(boardId);
                    if (!params.keyword[0] || !VALIDKEYWORD.includes(params.keyword[0])) {
                        return `No valid key-word found. Your message should begin with one of the valid key-word.
                        \nValid key-word are ${VALIDKEYWORD.join(', ')}`;
                    }
                    if (params.board === '') {
                        return 'You have to choose a board';
                    }
                    if (!board) {
                        return 'Board not found.';
                    }
                    /* if (params.list === '') {
                        return 'You have to choose a list';
                    } */
                    console.log(params.keyword[0]);
                    const listParam = board.lists.find(list => list.name === params.list && list.isArchived === false);
                    if (params.keyword[0] === 'addCard') {
                        return addCard(params, board, listParam);
                    }
                    if (params.keyword[0] === 'getInfo') {
                        return (getInfo(params, board, listParam));
                    }
                    if (params.keyword[0] === 'removeCard') {
                        return removeCard(params, board, listParam);
                    }
                    if (params.keyword[0] === 'addLabel') {
                        return addLabel(params, board, listParam);
                    }
                    if (params.keyword[0] === 'removeLabel') {
                        return removeLabel(params, board, listParam);
                    }
                    return 'Invalid request';
                };
                const result = await message(params);

                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `${result}`
                        }]
                    },
                    method: 'post',
                }).then().catch();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/auth/slack', passport.authenticate('slack'))
        .get('/auth/slack/callback', passport.authenticate('slack', { session: false }), async (req, res) => {
            try {
                console.log('callback');
            } catch (e) {
                res.status(500, 'Internal server error');
            }
        });
};

const axios = require('axios');
const slackController = require('../controllers/slack');
const BoardController = require('../controllers/boards');
const CardController = require('../controllers/cards');

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

module.exports = (router) => {
    router
        .post('/slack/test', async (req, res) => {
            try {
                res.status(204).send();
                // const result = await slackController.slackAction(req.param('text'));
                const params = parse(req.param('text'));
                const board = await BoardController.getBoard('b00000000001');
                const listParam = board.lists.find(list => list.name === params.list && list.isArchived === false);
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
        .post('/slack', async (req, res) => {
            try {
                res.status(204).send();
                const board = await slackController.getBoard();
                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `The board ${board.name} has ${board.lists.length} lists.`
                        }]
                    },
                    method: 'post',
                }).then().catch();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/slack/lists', async (req, res) => {
            try {
                let listTitle = ' ';
                res.status(204).send();
                const board = await slackController.getBoard();
                board.lists.forEach((list) => {
                    listTitle += ` \n-${list.name}`;
                });
                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `The lists of the board ${board.name} are:${listTitle}.`
                        }]
                    },
                    method: 'post',
                }).then().catch();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/slack/cards', async (req, res) => {
            try {
                let cardTitle = ' ';
                res.status(204).send();
                const board = await slackController.getBoard();
                board.lists.forEach((list) => {
                    list.cards.forEach((card) => {
                        cardTitle += `\n-${card.name}`;
                    });
                });
                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `The card of the board ${board.name} are:${cardTitle}.`
                        }]
                    },
                    method: 'post',
                }).then().catch();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

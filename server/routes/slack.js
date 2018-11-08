const axios = require('axios');
const slackController = require('../controllers/slack');


module.exports = (router) => {
    router
        .post('/slack', async (req, res) => {
            try {
                res.status(200).send('Fetching...');
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
                res.status(200).send('Fetching...');
                const board = await slackController.getBoard();
                board.lists.forEach((list) => {
                    listTitle += ` ${list.name}`;
                });
                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `The lists of the board ${board.name} are ${listTitle}.`
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
                res.status(200).send('Fetching...');
                const board = await slackController.getBoard();
                board.lists.forEach((list) => {
                    list.cards.forEach((card) => {
                        cardTitle += ` ${card.name}`;
                    });
                });
                axios({
                    url: req.param('response_url'),
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        attachments: [{
                            color: '#009cdd',
                            text: `The card of the board ${board.name} are ${cardTitle}.`
                        }]
                    },
                    method: 'post',
                }).then().catch();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

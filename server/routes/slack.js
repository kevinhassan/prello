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
        });
};

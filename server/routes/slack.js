const slackController = require('../controllers/slack');

module.exports = (router) => {
    router
        .post('/slack', async (req, res) => {
            try {
                res.status(200).send('Working on it');
                slackController.getBoard(req);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

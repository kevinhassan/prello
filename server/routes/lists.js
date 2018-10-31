const listController = require('../controllers/lists.js');

module.exports = (router) => {
    router
        .post('/boards/:boardId/lists', async (req, res) => {
            try {
                await listController.createList(req.body.list.name, req.params.boardId);
                res.status(204).send();
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

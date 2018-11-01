const listController = require('../controllers/lists');

module.exports = (router) => {
    router
        .post('/boards/:boardId/lists', async (req, res) => {
            try {
                const listCreated = await listController.createList(req.body.list.name, req.params.boardId);
                res.status(201).send({ message: 'List successfully created', list: listCreated });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

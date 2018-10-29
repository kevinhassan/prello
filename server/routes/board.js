const boardController = require('../controllers/board');

module.exports = (router) => {
    router
        .get('/board/:boardId', async (req, res) => {
            try {
                const boardFound = await boardController.get(req.params.boardId);
                res.status(200).send({ board: boardFound });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })

        .put('/board/:boardId/lists', async (req, res) => {
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.status(204).send();
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

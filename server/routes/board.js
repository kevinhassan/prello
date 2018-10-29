const boardController = require('../controllers/board');

module.exports = (router) => {
    router
        .get('/board/:boardId', async (req) => {
            try {
                const boardFound = await boardController.get(req.params.boardId);
                return boardFound;
            } catch (e) {
                throw e;
            }
        })

        .put('/board/:boardId/lists', async (req, res) => {
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.status(204).send();
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

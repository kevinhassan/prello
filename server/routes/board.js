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
        });
};

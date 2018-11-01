const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const { boardValidator } = require('../validators');

module.exports = (router) => {
    router
        .get('/boards/:boardId', async (req, res) => {
            try {
                const boardFound = await boardController.get(req.params.boardId);
                res.status(200).send({ board: boardFound });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/boards/:boardId/lists', boardValidator.updateBoardList, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards', boardValidator.addBoard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const boardCreated = await boardController.createBoard(req.body);
                res.status(201).send({ message: 'Board successfully created', board: boardCreated._id });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/boards/:boardId/lists', async (req, res) => {
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.status(204).send();
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/board');
const { boardValidator } = require('../validators');

module.exports = (router) => {
    router
        .get('/board/:boardId', async (req, res) => {
            try {
                const boardFound = await boardController.get(req.params.boardId);
                res.status(200).send({ board: boardFound });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/board/:boardId/lists', boardValidator.updateBoardList, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/board', boardValidator.addBoard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                const boardCreated = await boardController.createBoard(req.body);
                res.status(201).send({ message: 'Board successfully created', board: boardCreated._id });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
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

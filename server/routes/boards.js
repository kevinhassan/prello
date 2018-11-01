const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const { boardValidator } = require('../validators');

/**
* @swagger
* definitions:
*   NewBoard:
*       properties:
*           name:
*               type: string
*           privacy:
*               type: string
*
* /boards/:boardId:
*   get:
*       tags:
*           - Board
*       description: Get all information of the board
*       summary: Specific board information
*       produces:
*           - application/json
*       responses:
*           200:
*               description: Board found sent 
*           404:
*               description: Board not found
*           500:
*               description: Internal server error
*   put:
*       tags:
*           - Board
*       description: Update lists of the specific boar
*       summary: Update lists
*       produces:
*           - application/json
*       responses:
*           204:
*               description: Board's lists updated 
*           404:
*               description: Board not found
*           422:
*               description: Incorrect Query
*           500:
*               description: Internal server error
*
* /boards:
*   post:
*       tags:
*           - User
*       description: Create a new empty Board
*       summary: Create new Board
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The information of the new boar
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewBoard'
*       responses:
*           201:
*               description: Board successfully created
*           404:
*               description: Board not found
*           422:
*               description: Invalid form data or Incorrect Query
*           500:
*               description: Internal server error

*/

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
};

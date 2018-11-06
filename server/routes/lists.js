const { validationResult } = require('express-validator/check');
const listController = require('../controllers/lists');
const { listValidator } = require('../validators');

/**
* @swagger
* definitions:
*   NewCard:
*       properties:
*           name:
*               type: string
*
* /lists/{listId}/cards:
*   post:
*       tags:
*           - List
*       description: Create a new empty Card
*       summary: Create new Card
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: listId
*             schema:
*               type: string
*             required: true
*             description: List ID
*           - name: body
*             description: The information of the new card
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewCard'
*       responses:
*           201:
*               description: Card successfully created
*           401:
*               description: Unauthorized user
*           422:
*               description: Incorrect query, data provided invalid or the specified list doesn\'t exist
*           500:
*               description: Internal server error
*
*/

module.exports = (router) => {
    router
        .post('/lists/:listId/cards', listValidator.addCard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const listCreated = await listController.postCard(req.params.listId, req.body.name);
                res.status(201).send({ message: 'Card successfully created', list: listCreated });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

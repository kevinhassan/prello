const { validationResult } = require('express-validator/check');
const cardController = require('../controllers/cards');
const { cardValidator } = require('../validators');

/**
* @swagger
* definitions:
*   NewCard:
*       properties:
*           name:
*               type: string
*           list:
*               type: string
* /cards:
*   post:
*       tags:
*           - Card
*       description: Create a new empty Card
*       summary: Create new Card
*       produces:
*           - application/json
*       parameters:
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
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*
*
* /cards/:cardId/description:
*   put:
*       tags:
*           - Card
*       description: Update the description of the specified card.
*       summary: Update description
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: cardId
*             schema:
*               type: string
*             required: true
*             description: Card ID
*           - in: body
*             name: description
*             schema:
*               type: string
*             required: false
*             description: new description, can be empty.
*       responses:
*           204:
*               description: Card description updated
*           404:
*               description: Card not found
*           422:
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*/

module.exports = (router) => {
    router
        .post('/cards', cardValidator.addCard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const cardId = await cardController.createCard({ name: req.body.name, list: req.body.list, });
                res.status(201).send({ message: 'Card successfully created', card: cardId });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/cards/:cardId/description', cardValidator.updateCardDescription, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.putDescription({ cardId: req.params.cardId, description: req.body.description, });
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

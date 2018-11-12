const { validationResult } = require('express-validator/check');
const cardController = require('../controllers/cards');
const listController = require('../controllers/lists');
const CardModel = require('../models/Card');
const List = require('../models/List');
const { cardValidator } = require('../validators');
const { Auth, Card } = require('../middlewares');
const { updateClientsOnBoard } = require('../socket');
/**
* @swagger
* definitions:
*   NewDescription:
*       properties:
*           description:
*               type: string
*   NewName:
*       properties:
*           name:
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
*               description:
*                   oneOf:
*                       - Incorrect query, data provided invalid
*                       - Incorrect query, the specified list doesn\'t exist
*           500:
*               description: Internal server error
*
* /cards/{cardId}/labels/{labelId}:
*   delete:
*       tags:
*           - Card
*       description: Delete an existing label to a card
*       summary: Delete label
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: cardId
*             schema:
*               type: string
*             required: true
*             description: Card Id
*           - in: body
*             name: labelId
*             schema:
*               type: string
*             required: true
*             description: Label Id
*       responses:
*           204:
*               description: Label removed
*           401:
*               description: Unauthorized user
*           422:
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*
*   post:
*       tags:
*           - Card
*       description: Add an existing label   to a card
*       summary: Add label
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: cardId
*             schema:
*               type: string
*             required: true
*             description: Card Id
*           - in: body
*             name: labelId
*             schema:
*               type: string
*             required: true
*             description: Label Id
*       responses:
*           204:
*               description: Label added
*           401:
*               description: Unauthorized user
*           422:
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*
* /cards/{cardId}/description:
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
*             description: new description, can be empty.
*             required: false
*             schema:
*               $ref: '#/definitions/NewDescription'
*       responses:
*           204:
*               description: Card description updated
*           404:
*               description: Card not found
*           422:
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*
* /cards/{cardId}/name:
*   put:
*       tags:
*           - Card
*       description: Update the name of the specified card.
*       summary: Update name
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
*             name: name
*             description: new name, must be at least 1 character long.
*             required: false
*             schema:
*               $ref: '#/definitions/NewName'
*       responses:
*           204:
*               description: Card name updated
*           404:
*               description: Card not found
*           422:
*               description: Incorrect query, data provided invalid
*           500:
*               description: Internal server error
*/

module.exports = (router) => {
    router
        .delete('/cards/:cardId/labels/:labelId', Auth.isAuthenticated, Card.canEdit, cardValidator.deleteLabel, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.deleteLabel({
                    cardId: req.params.cardId, labelId: req.params.labelId,
                });

                const card = await CardModel.findById(req.params.cardId);
                const list = await List.findById(card.list._id);
                res.status(200).send({ message: 'Label removed' });

                updateClientsOnBoard(list.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .post('/cards', cardValidator.addCard, Auth.isAuthenticated, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const cardCreated = await cardController.postCard({
                    name: req.body.name, list: req.body.list,
                });

                res.status(201).send({ message: 'Card successfully created', card: cardCreated._id });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .post('/cards/:cardId/labels/:labelId', Auth.isAuthenticated, Card.canEdit, cardValidator.addLabel, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.addLabel({
                    cardId: req.params.cardId, labelId: req.params.labelId,
                });

                const card = await CardModel.findById(req.params.cardId);
                const list = await List.findById(card.list._id);

                res.status(200).send({ message: 'Label added' });

                updateClientsOnBoard(list.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/cards/:cardId/description', Auth.isAuthenticated, Card.canEdit, cardValidator.updateCardDescription, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const card = await cardController.putDescription(req.params.cardId, req.body.description);
                const list = await listController.getList(card.list._id);
                res.sendStatus(204);

                updateClientsOnBoard(list.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/cards/:cardId/name', Auth.isAuthenticated, Card.canEdit, cardValidator.updateCardName, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const card = await cardController.putName(req.params.cardId, req.body.name);
                const list = await listController.getList(card.list._id);
                res.sendStatus(204);

                updateClientsOnBoard(list.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/cards/:cardId/archive', Auth.isAuthenticated, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.archiveCard(req.params.cardId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/cards/:cardId/dueDate', Auth.isAuthenticated, Card.canEdit, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.editDate(req.params.cardId, req.body.dueDate);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

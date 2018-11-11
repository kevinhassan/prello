const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const cardController = require('../controllers/cards');
const listController = require('../controllers/lists');
const { listValidator } = require('../validators');

const socket = require('../socket');

const { Auth, List } = require('../middlewares');
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
* /lists/:listId/cards/:cardId:
*   put:
*       tags:
*           - List
*       description: Add the card to the specified list and remove it from his source list
*       summary: Move a card from a list to another one
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: listId
*             schema:
*               type: string
*             required: true
*             description: Destination list Id
*           - in: path
*             name: cardId
*             schema:
*               type: string
*             required: true
*             description: Card moved Id
*           - in: body
*             name: index
*             schema:
*               type: integer
*             required: true
*             description: Index where the card is moved to
*           - in: body
*             name: sourceListId
*             schema:
*               type: string
*             required: true
*             description: Source list id where the card is moved from
*       responses:
*           201:
*               description: Card successfully moved
*           401:
*               description: Unauthorized user
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
*/

module.exports = (router) => {
    router
        .post('/lists/:listId/cards', Auth.isAuthenticated, List.canEdit, listValidator.addCard, async (req, res) => {
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
        })

        .put('/lists/:listId/cards/:cardId', Auth.isAuthenticated, listValidator.moveCard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                // Remove card from source list
                await listController.removeCard({
                    cardId: req.params.cardId,
                    listId: req.body.sourceListId,
                });

                // Add card to destination list
                const listUpdated = await listController.addCard(req.body.index,
                    req.params.listId,
                    req.params.cardId);

                // Update listId in card
                await cardController.putList({
                    cardId: req.params.cardId,
                    listId: req.params.listId
                });

                // Return all the board lists updated
                const listsUpdated = await boardController.getBoard(listUpdated.board._id).lists;

                res.status(200).send({ message: 'Card successfully moved', lists: listsUpdated });
                socket.updateClientsOnBoard(listUpdated.board._id);
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })

        .put('/lists/:listId/archive', Auth.isAuthenticated, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            console.log(req.params.listId);

            try {
                await listController.archiveList(req.params.listId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

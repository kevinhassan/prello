const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const cardController = require('../controllers/cards');
const listController = require('../controllers/lists');
const { listValidator } = require('../validators');
const { Auth, List } = require('../middlewares');
const { updateClientsOnBoard } = require('../socket');
/**
* @swagger
* definitions:
*   NewCard:
*       properties:
*           name:
*               type: string
*   ArchivedForm:
*       properties:
*           isArchived:
*               type: boolean
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
* /lists/{listId}/isArchived:
*   put:
*       tags:
*           - List
*       description: Put list isArchived
*       summary: Put list isArchived
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: listId
*             schema:
*               type: string
*             required: true
*             description: List Id
*           - in: body
*             name: isArchivedValue
*             description: isArchived new value
*             required: true
*             schema:
*               $ref: '#/definitions/ArchivedForm'
*       responses:
*           204:
*               description: List isArchived updated
*           404:
*               description: List not found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*/

module.exports = (router) => {
    router
        .post('/lists/:listId/cards', Auth.isAuthenticated, List.canEdit, listValidator.addCard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                const newList = await listController.postCard(req.params.listId, req.body.name);
                res.status(201).send({ message: 'Card successfully created', list: newList });

                updateClientsOnBoard(newList.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/lists/:listId/cards/:cardId', Auth.isAuthenticated, List.canEdit, listValidator.moveCard, async (req, res) => {
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

                updateClientsOnBoard(listUpdated.board._id);
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })
        .put('/lists/:listId/isArchived', Auth.isAuthenticated, List.canEdit, listValidator.archiveCard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const newList = await listController.archiveList(req.params.listId, req.body.isArchived);
                res.sendStatus(204);

                updateClientsOnBoard(newList.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/lists/:listId/name', Auth.isAuthenticated, List.canEdit, listValidator.changeName, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const newList = await listController.putName(req.params.listId, req.body.name);
                res.sendStatus(204);

                updateClientsOnBoard(newList.board._id);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

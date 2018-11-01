const { validationResult } = require('express-validator/check');
const cardController = require('../controllers/cards');
const { cardValidator } = require('../validators');

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
* /cards/:cardId/description:
*   put:
*       tags:
*           - Card
*       description: Update the description of the specified card.
*       summary: Update description
*       produces:
*           - application/json
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
        .put('/cards/:cardId/description', cardValidator.updateCardDescription, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Incorrect query, data provided invalid' });
            }
            try {
                await cardController.putDescription(req.params.cardId, req.body.description);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

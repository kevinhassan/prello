const { validationResult } = require('express-validator/check');
const listController = require('../controllers/lists');
const { listValidator } = require('../validators');


/**
* @swagger
* definitions:
*   NewList:
*       properties:
*           name:
*               type: string
*           boardId:
*               type: string
*
* /lists:
*   post:
*       tags:
*           - List
*       description: Create a new empty List
*       summary: Create new List
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The information of the new list
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewList'
*       responses:
*           201:
*               description: List successfully created
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
        .post('/lists', listValidator.addList, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const listCreated = await listController.createList(req.body);
                res.status(201).send({ message: 'List successfully created', list: listCreated });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

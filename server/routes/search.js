const { validationResult } = require('express-validator/check');
const { searchValidator } = require('../validators');
const { Auth } = require('../middlewares');
const userController = require('../controllers/users');
const teamController = require('../controllers/teams');

/**
* @swagger
* definitions:
*   SearchMember:
*       properties:
*           username:
*               type: string
*
* /search/members:
*   post:
*       tags:
*           - Search
*       description: Search a member
*       summary: Search member
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The member to found
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/SearchMember'
*       responses:
*           200:
*               description: Team successfully created
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
        .post('/search/members', Auth.isAuthenticated, [searchValidator.searchMember], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const membersFound = await userController.foundMembers(req.body.username);
                res.status(200).send({ message: 'Members successfully found', members: membersFound });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

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
*   TeamMember:
*       properties:
*           name:
*               type: string
*
* /search/members:
*   get:
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
*               description: Members successfully found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /search/teams:
*   get:
*       tags:
*           - Search
*       description: Search our team
*       summary: Search team
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The team to found
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/SearchTeam'
*       responses:
*           200:
*               description: Team successfully found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
*/

module.exports = (router) => {
    router
        .get('/search/members', Auth.isAuthenticated, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const membersFound = await userController.findMembers(req.user._id, req.query.username);
                res.status(200).send({ message: 'Members successfully found', members: membersFound });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })
        .get('/search/teams', Auth.isAuthenticated, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const teamsFound = await teamController.foundTeam(req.user._id, req.query.team);
                res.status(200).send({ message: 'Temas successfully found', teams: teamsFound });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

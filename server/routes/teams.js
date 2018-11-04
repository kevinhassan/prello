const { validationResult } = require('express-validator/check');
const { teamValidator } = require('../validators');
const { Auth, Team } = require('../middlewares');
const teamController = require('../controllers/teams');
/**
* @swagger
* definitions:
*   NewTeam:
*       properties:
*           name:
*               type: string
*           isVisible:
*               type: boolean
*
* /teams:
*   post:
*       tags:
*           - Team
*       description: Create a new team
*       summary: Create new team
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The information of the new team
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewTeam'
*       responses:
*           201:
*               description: Team successfully created
*           401:
*               description: Unauthorized user
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
*
* /teams/{teamId}:
*   delete:
*       tags:
*           - Team
*       description: Remove a team
*       summary: Remove team
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: string
*             required: true
*             description: Team ID
*       responses:
*           204:
*               description: Team successfully deleted
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           500:
*               description: Internal server error
*
*/

module.exports = (router) => {
    router
        .post('/teams', Auth.isAuthenticated, [teamValidator.addTeam], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const teamCreated = await teamController.createTeam(req.user, req.body);
                res.status(201).send({ message: 'Team successfully created', team: teamCreated });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })
        .delete('/teams/:teamId', Auth.isAuthenticated, [Team.isAdmin], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.removeTeam(req.params.teamId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

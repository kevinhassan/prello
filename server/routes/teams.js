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
*   AddMemberForm:
*       properties:
*           email:
*               type: string
*   ChangeAccessForm:
*       properties:
*           isAdmin:
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
* /teams/{teamId}/members:
*   post:
*       tags:
*           - Team
*       description: Add member to team
*       summary: Add member
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: string
*             required: true
*             description: Team ID
*           - name: body
*             description: The information of the new member
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AddMemberForm'
*       responses:
*           201:
*               description: User successfully added
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           500:
*               description: Internal server error
*
* /teams/{teamId}/members/{memberId}:
*   put:
*       tags:
*           - Team
*       description: Add member to team
*       summary: Add member
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: string
*             required: true
*             description: Team ID
*           - in: path
*             name: memberId
*             schema:
*               type: string
*             required: true
*             description: member ID
*           - name: body
*             description: New access right for the member
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/ChangeAccessForm'
*       responses:
*           204:
*               description: The member's access is updated
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
                await teamController.removeTeam(req.user._id, req.params.teamId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })
        .post('/teams/:teamId/members', Auth.isAuthenticated, [Team.isAdmin], [teamValidator.addMember], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const newTeam = await teamController.addMemberWithMail(req.params.teamId, req.body.email);
                res.status(201).send({ message: 'User successfully created', team: newTeam });
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        })
        .put('/teams/:teamId/members/:memberId', Auth.isAuthenticated, [Team.isAdmin], [teamValidator.changeAccess], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.changeAccess(req.params.teamId, req.params.memberId, req.body.isAdmin);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ err: e.message });
            }
        });
};

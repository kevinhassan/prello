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
*           username:
*               type: string
*   ChangeAccessForm:
*       properties:
*           canEdit:
*               type: boolean
*
*   NewName:
*       properties:
*           name:
*               type: string
*
*   NewDescription:
*       properties:
*           description:
*               type: string

*   NewVisibility:
*       properties:
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
*   get:
*       tags:
*           - Team
*       description: Get the team
*       summary: Get the team
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
*           200:
*               description: Team found
*           401:
*               description: You are not allowed to access this team. Please sign in and try again.
*           403:
*               description: You can't access this team because it is not visible.
*           404:
*               description: Team not found
*           422:
*               description: Incorrect team id
*           500:
*               description: Internal server error
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
* /teams/{teamId}/visibility:
*   put:
*       tags:
*           - Team
*       description: Change team's visibility
*       summary: Change visibility
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
*             description: The new visibility of the team
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewVisibility'
*       responses:
*           204:
*               description: Team visibility successfully updated
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           500:
*               description: Internal server error
*
* /teams/{teamId}/name:
*   put:
*       tags:
*           - Team
*       description: Change team's name
*       summary: Change name
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
*             description: The new name of the team
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewName'
*       responses:
*           204:
*               description: Team name successfully updated
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           500:
*               description: Internal server error
*
* /teams/{teamId}/description:
*   put:
*       tags:
*           - Team
*       description: Change team's description
*       summary: Change description
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
*             description: The new description of the team
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewDescription'
*       responses:
*           204:
*               description: Team name successfully updated
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
*             description: The username of the new member
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AddMemberForm'
*       responses:
*           201:
*               description: User successfully added to the team
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           409:
*               description: User already in the team
*           500:
*               description: Internal server error
*
* /teams/{teamId}/members/{memberId}:
*   put:
*       tags:
*           - Team
*       description: Change access right for team's member
*       summary: Change access right
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
*             description: Member ID
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
*   delete:
*       tags:
*           - Team
*       description: Remove member from team
*       summary: Remove member
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
*
*       responses:
*           204:
*               description: The member has been successfully removed
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
                const teamCreated = await teamController.postTeam(req.user, req.body);
                res.status(201).send({ message: 'Team successfully created', team: teamCreated });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/teams/:teamId', [Team.canSee], async (req, res) => {
            try {
                const team = await teamController.getTeam(req.params.teamId);
                res.status(200).send({ team });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        }).delete('/teams/:teamId', Auth.isAuthenticated, [Team.canEdit], async (req, res) => {
            try {
                await teamController.deleteTeam(req.params.teamId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/teams/:teamId/name', Auth.isAuthenticated, [Team.canEdit], teamValidator.changeName, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.putTeamName(req.params.teamId, req.body.name);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/teams/:teamId/description', Auth.isAuthenticated, [Team.canEdit], teamValidator.changeDescription, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.putTeamDescription(req.params.teamId, req.body.description);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/teams/:teamId/visibility', Auth.isAuthenticated, [Team.canEdit], teamValidator.changeVisibility, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.putVisibility(req.params.teamId, req.body.isVisible);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/teams/:teamId/members', Auth.isAuthenticated, [Team.canEdit], [teamValidator.addMember], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const newTeam = await teamController.postMember(req.params.teamId, req.body.username);
                res.status(201).send({ message: 'User successfully added to the team', team: newTeam });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/teams/:teamId/members/:memberId', Auth.isAuthenticated, [Team.canEdit], [teamValidator.changeAccess], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await teamController.putMemberAccess(req.params.teamId, req.user._id, req.params.memberId, req.body.isAdmin);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .delete('/teams/:teamId/members/:memberId', Auth.isAuthenticated, [Team.canEdit], async (req, res) => {
            try {
                await teamController.deleteMember(req.params.teamId, req.user._id, req.params.memberId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

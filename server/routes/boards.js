const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const { boardValidator } = require('../validators');
const { Auth, Board } = require('../middlewares');
/**
* @swagger
* definitions:
*   NewBoard:
*       properties:
*           name:
*               type: string
*           visibility:
*               type: string
*   VisibilityForm:
*       properties:
*           visibility:
*               type: string
*   AddMemberForm:
*       properties:
*           email:
*               type: string
*   AddTeamForm:
*       properties:
*           team:
*               type: string
*   ChangeAccessForm:
*       properties:
*           isAdmin:
*               type: boolean
*
* /boards/{boardId}:
*   get:
*       tags:
*           - Board
*       description: Get all information of the board
*       summary: Get specific board information
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*       responses:
*           200:
*               description: Board found sent
*           404:
*               description: Board not found
*           500:
*               description: Internal server error
*
* /boards/{boardId}/lists:
*   put:
*       tags:
*           - Board
*       description: Update lists of the specified board
*       summary: Update lists
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - in: body
*             name: lists
*             schema:
*               type: array
*               items:
*                   type: string
*             required: true
*             description: Board ID
*       responses:
*           204:
*               description: Board's lists updated
*           401:
*               description: Unauthorized user
*           404:
*               description: Board not found
*           422:
*               description: Incorrect Query
*           500:
*               description: Internal server error
*
* /boards:
*   post:
*       tags:
*           - Board
*       description: Create a new empty Board
*       summary: Create new Board
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The information of the new boar
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewBoard'
*       responses:
*           201:
*               description: Board successfully created
*           401:
*               description: Unauthorized user
*           422:
*               description: Invalid form data or Incorrect Query
*           500:
*               description: Internal server error
*
* /boards/{boardId}/visibility:
*   put:
*       tags:
*           - Board
*       description: The admin change the visibility of the board (public, private, team)
*       summary: Change board visibility
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - name: body
*             description: The new visibility of the boar
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/VisibilityForm'
*       responses:
*           204:
*               description: The visility of the board is updated
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           404:
*               description: Board not found
*           422:
*               description: Invalid form data or Incorrect Query
*           500:
*
* /boards/{boardId}/members:
*   post:
*       tags:
*           - Board
*       description: The admin add member to the board
*       summary: Add board member
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - name: body
*             description: Email of the user to add
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AddMemberForm'
*       responses:
*           204:
*               description: The visility of the board is updated
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           404:
*               description: Board not found or member to add unknown
*           422:
*               description: Invalid form data or Incorrect Query
*           500:
*               description: Internal server error
*
* /boards/{boardId}/members/{memberId}:
*   delete:
*       tags:
*           - Board
*       description: The admin remove a member from the board
*       summary: Remove board member
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - in: path
*             name: memberId
*             schema:
*               type: string
*             required: true
*             description: Member ID
*       responses:
*           204:
*               description: The visility of the board is updated
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           404:
*               description: Board not found or member to remove unknown
*           422:
*               description: Invalid form data or Incorrect Query
*           500:
*               description: Internal server error
*
*   put:
*       tags:
*           - Board
*       description: The admin add admin access to a member of the board
*       summary: Add admin access to the board
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
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
*           404:
*               description: Board not found or member unknown
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /boards/{boardId}/teams:
*   post:
*       tags:
*           - Board
*       description: Add a team to the board
*       summary: Add team
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - name: body
*             description: The team ID to add
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AddTeamForm'
*       responses:
*           204:
*               description: Team successfully added
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           404:
*               description: Board or Team not found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /boards/{boardId}/teams/{teamId}:
*   delete:
*       tags:
*           - Board
*       description: Remove a team to the board
*       summary: Remove team
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board ID
*           - in: path
*             name: teamId
*             schema:
*               type: string
*             required: true
*             description: Team ID
*       responses:
*           204:
*               description: Team successfully removed
*           401:
*               description: Unauthorized user
*           403:
*               description: Forbidden access
*           404:
*               description: Team not found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
*
*/

module.exports = (router) => {
    router
        .get('/boards/:boardId', async (req, res) => {
            try {
                const boardFound = await boardController.get(req.params.boardId);
                res.status(200).send({ board: boardFound });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        .put('/boards/:boardId/lists', boardValidator.updateBoardLists, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards', Auth.isAuthenticated, boardValidator.addBoard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const boardCreated = await boardController.createBoard(req.user._id, req.body);
                res.status(201).send({ message: 'Board successfully created', board: boardCreated._id });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/visibility', Auth.isAuthenticated, Board.isAdmin, boardValidator.changeVisibility, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.changeVisibility(req.params.boardId, req.body.visibility);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/members', Auth.isAuthenticated, Board.isAdmin, boardValidator.addMember, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.addMemberWithMail(req.params.boardId, req.body.email);
                res.status(201).send({ message: 'Member successfully added' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .delete('/boards/:boardId/members/:memberId', Auth.isAuthenticated, Board.isAdmin, async (req, res) => {
            try {
                await boardController.removeMember(req.params.boardId, req.params.memberId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/members/:memberId', Auth.isAuthenticated, Board.isAdmin, boardValidator.changeAccess, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.changeAccess(req.params.boardId,
                    req.params.memberId,
                    req.body.isAdmin);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/teams', Auth.isAuthenticated, Board.isAdmin, boardValidator.addTeam, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await boardController.addTeam(req.params.boardId, req.user._id, req.body.team);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .delete('/boards/:boardId/teams/:teamId', Auth.isAuthenticated, Board.isAdmin, async (req, res) => {
            try {
                await boardController.removeTeam(req.params.boardId, req.params.teamId);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

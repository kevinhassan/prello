const { validationResult } = require('express-validator/check');
const boardController = require('../controllers/boards');
const { boardValidator, listValidator } = require('../validators');
const { Auth, Board } = require('../middlewares');
const { updateClientsOnBoard } = require('../socket');

/**
* @swagger
* definitions:
*   NewBoard:
*       properties:
*           name:
*               type: string
*           visibility:
*               type: string
*
*   NewLabel:
*       properties:
*           name:
*               type: string
*           color:
*               type: string
*           boardId:
*               type: string
*
*   VisibilityForm:
*       properties:
*           visibility:
*               type: string
*
*   ArchivedForm:
*       properties:
*           isArchived:
*               type: boolean
*
*   BoardGithubRepoForm:
*       properties:
*           url:
*               type: string
*           name:
*               type: string
*
*   AddMemberToBoardForm:
*       properties:
*           email:
*               type: string
*           username:
*               type: string
*   AddTeamForm:
*       properties:
*           team:
*               type: string
*   ChangeAccessForm:
*       properties:
*           isAdmin:
*               type: boolean
*   NewList:
*       properties:
*           name:
*               type: string
*
*   UpdatedList:
*       properties:
*           lists:
*               type: array
*               items:
*                   type: string
*
* /boards:
*
*   get:
*       tags:
*           - Board
*       description: Get all boards
*       summary: Get boards
*       produces:
*           - application/json
*       responses:
*           200:
*               description: Boards found
*           401:
*               description: Unauthorized, you need to be authenticated
*           500:
*               description: Internal server error

*   post:
*       tags:
*           - Board
*       description: Create a new empty Board
*       summary: Create new Board
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The new board information
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
* /boards/{boardId}:
*   get:
*       tags:
*           - Board
*       description: Get all information of the board
*       summary: Get board
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
*   post:
*       tags:
*           - Board
*       description: Create a new empty List
*       summary: Create new List
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
*             description: The new list information
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
*             required: true
*             description: Board ID
*             schema:
*               type: string
*           - in: body
*             name: lists
*             required: true
*             description: Board ID
*             schema:
*               $ref: '#/definitions/UpdatedList'
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
*             description: The new visibility of the board
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
*               description: Internal server error
*
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
*             description: Email or username of the user to add
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AddMemberToBoardForm'
*       responses:
*           204:
*               description: Member successfully added to the board
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
* /boards/{boardId}/labels:
*   get:
*       tags:
*           - Board
*       description: Get board labels
*       summary: Get board labels
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
*               description: Board labels found
*           404:
*               description: Board not found
*           500:
*               description: Internal server error
*
*   post:
*       tags:
*           - Board
*       description: Create a new label
*       summary: Create a new label
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The information of the new label
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewLabel'
*       responses:
*           201:
*               description: Label successfully created
*           401:
*               description: Unauthorized user
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /boards/{boardId}/isArchived:
*   put:
*       tags:
*           - Board
*       description: Put board isArchived
*       summary: Put board isArchived
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board Id
*           - in: body
*             name: isArchived
*             description: isArchived new value
*             required: true
*             schema:
*               $ref: '#/definitions/ArchivedForm'
*       responses:
*           204:
*               description: Board isArchived updated
*           404:
*               description: Board not found
*           500:
*               description: Internal server error
*
* /boards/{boardId}/githubRepo:
*   put:
*       tags:
*           - Board
*       description: Put board github repo
*       summary: Put board github repo
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: boardId
*             schema:
*               type: string
*             required: true
*             description: Board Id
*           - in: body
*             name: githubRepo
*             description: githubRepo new value
*             required: true
*             schema:
*               $ref: '#/definitions/BoardGithubRepoForm'
*       responses:
*           204:
*               description: Board github repo updated
*           422:
*               description: Invalid form data
*           404:
*               description: Board not found
*           500:
*               description: Internal server error
*/

module.exports = (router) => {
    router
        // ===== GET ===== //
        .get('/boards', Auth.isAuthenticated, async (req, res) => {
            try {
                const { boards } = await boardController.getBoards(req.user);
                res.status(200).send({ boards });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/boards/:boardId', [Board.canSee], async (req, res) => {
            try {
                const boardFound = await boardController.getBoard(req.params.boardId);
                res.status(200).send({ board: boardFound });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/boards/:boardId/labels', [Board.canSee], async (req, res) => {
            try {
                const labels = await boardController.getLabels(req.params.boardId);
                res.status(200).send({ labels });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        // ===== POST ===== //
        .post('/boards', Auth.isAuthenticated, boardValidator.addBoard, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const boardCreated = await boardController.postBoard(req.user._id, req.body);
                res.status(201).send({ message: 'Board successfully created', board: boardCreated });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/members', Auth.isAuthenticated, Board.isAdmin, boardValidator.addMember, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                let user;
                if (req.body.email) user = await boardController.postMemberWithMail(req.params.boardId, req.body.email);
                else user = await boardController.postMemberWithUsername(req.params.boardId, req.body.username);
                res.status(201).send({ message: 'Member successfully added to the board', user });

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/labels', boardValidator.createLabel, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const labelCreated = await boardController.postLabel({
                    color: req.body.color,
                    name: req.body.name,
                    boardId: req.params.boardId,
                });
                res.status(201).send({ message: 'Label successfully created', label: labelCreated });

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/lists', Auth.isAuthenticated, Board.isMember, listValidator.addList, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                const listCreated = await boardController.postList(req.params.boardId, req.body.name);
                res.status(201).send({ message: 'List successfully created', list: listCreated });

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/boards/:boardId/teams', Auth.isAuthenticated, Board.isAdmin, boardValidator.addTeam, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.postTeam(req.params.boardId, req.body.team);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        // ===== PUT ===== //
        .put('/boards/:boardId/lists', Auth.isAuthenticated, Board.isMember, boardValidator.updateBoardLists, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putLists(req.params.boardId, req.body.lists);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/visibility', Auth.isAuthenticated, Board.isAdmin, boardValidator.changeVisibility, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putVisibility(req.params.boardId, req.body.visibility);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/isArchived', Auth.isAuthenticated, Board.isMember, boardValidator.changeIsArchived, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putIsArchived(req.params.boardId, req.body.isArchived);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/members/:memberId', Auth.isAuthenticated, Board.isAdmin, boardValidator.changeAccess, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putAccess(req.params.boardId,
                    req.params.memberId,
                    req.body.isAdmin);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/name/:boardName', Auth.isAuthenticated, Board.isMember, boardValidator.changeName, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putName(req.params.boardId, req.params.boardName);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/boards/:boardId/githubRepo/', Auth.isAuthenticated, Board.isAdmin, boardValidator.changeGithubRepo, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ error: 'Invalid form data' });
            }
            try {
                await boardController.putGithubRepo(req.params.boardId, req.body.name, req.body.url);
                res.sendStatus(204);
                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })

        // ===== DELETE ===== //
        .delete('/boards/:boardId/teams/:teamId', Auth.isAuthenticated, Board.isAdmin, async (req, res) => {
            try {
                await boardController.deleteTeam(req.params.boardId, req.params.teamId);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .delete('/boards/:boardId/members/:memberId', Auth.isAuthenticated, Board.isAdmin, async (req, res) => {
            try {
                await boardController.deleteMember(req.params.boardId, req.params.memberId);
                res.sendStatus(204);

                updateClientsOnBoard(req.params.boardId);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

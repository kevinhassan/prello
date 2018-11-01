const { validationResult } = require('express-validator/check');
const userController = require('../controllers/users');
const Auth = require('../middlewares/auth');
const MyError = require('../util/error');
const {
    registerValidator, loginValidator, accountValidator, profileValidator,
    forgotValidator, resetValidator
} = require('../validators');

/**
* @swagger
* definitions:
*   NewUser:
*       properties:
*           fullName:
*               type: string
*           email:
*               type: string
*           password:
*               type: string
*
*   LoginForm:
*       properties:
*           email:
*               type: string
*           password:
*               type: string
*
*   ProfileForm:
*       properties:
*           fullName:
*               type: string
*           initials:
*               type: string
*           bio:
*               type: string
* /register:
*   post:
*       tags:
*           - Authentication
*       description: User object that needs to be added to the application
*       summary: CREATE the new user
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The user to add
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/NewUser'
*       responses:
*           201:
*               description: User successfully created
*           409:
*               description: An account already exists for this email
*           422:
*               description: Incorrect form
*           500:
*               description: Internal server error
* /login:
*   post:
*       tags:
*           - Authentication
*       description: User object that needs to be log to the application
*       summary: Connect the user
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The user to sign in
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/LoginForm'
*       responses:
*           200:
*               description: User successfully connected
*           401:
*               description: Invalid credentials (email and/or password)
*           422:
*               description: Incorrect form
*           500:
*               description: Internal server error
* /profile:
*   get:
*       tags:
*           - Authentication
*       description: User profile
*       summary: Get the user profile
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             in: header
*             required: true
*             schema:
*               $ref: '#/definitions/LoginForm'
*       responses:
*           200:
*               description: User successfully get his profile
*           401:
*               description: Unauthorized user
*           500:
*               description: Internal server error
*
*   put:
*       tags:
*           - Authentication
*       description: User object that needs to update his profile
*       summary: Update the user profile
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The user information to update
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/ProfileForm'
*       responses:
*           204:
*               description: User profile successfully updated
*           400:
*               description: Update profile failed
*           409:
*               description: Username is taken
*           422:
*               description: Incorrect form
*           500:
*               description: Internal server error
*
*/

module.exports = (router) => {
    router
        .post('/register', registerValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                if (!req.body.fullName || !req.body.email || !req.body.password) throw new MyError(400, 'Missing information.');
                await userController.postRegister(req.body);
                res.status(201).send({ message: 'User successfully created.' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/login', loginValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                const authToken = await userController.login(req.body.email, req.body.password);
                res.status(200).send({ message: 'Connected.', token: authToken });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/profile', Auth.isAuthentificated, async (req, res) => {
            try {
                const profile = await userController.getProfile(req.user);
                res.status(200).send({ profile });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/profile', Auth.isAuthentificated, [profileValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                await userController.updateProfile(req.user, req.body);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/account', Auth.isAuthentificated, [accountValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                await userController.updateAccount(req.user, req.body);
                res.sendStatus(204);
                // TODO: disconnect user if credentials change
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .delete('/account', Auth.isAuthentificated, async (req, res) => {
            try {
                await userController.deleteAccount(req.user);
                res.status(200).send({ message: 'Account successfully deleted.' });
                // TODO: disconnect user if credentials change
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/account', Auth.isAuthentificated, async (req, res) => {
            try {
                const user = await userController.getAccount(req.user);
                res.status(200).send({ user });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/forgot', [forgotValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                await userController.postForgot(req.body.email, req.headers.host);
                res.status(200).json({ message: 'Reset mail sent.' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/reset/:token', [resetValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                await userController.resetPassword(req.params.token, req.body.password);
                res.status(200).send({ message: 'Password successfully reseted.' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

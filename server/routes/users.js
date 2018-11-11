const { validationResult } = require('express-validator/check');
const userController = require('../controllers/users');
const Auth = require('../middlewares/auth');

const {
    registerValidator, loginValidator, accountValidator, profileValidator,
    forgotValidator, resetValidator, passwordValidator,
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
*           biography:
*               type: string
*   AccountForm:
*       properties:
*           email:
*               type: string
*           password:
*               type: string
*
*   ForgotPasswordForm:
*       properties:
*           email:
*               type: string
*
*   ResetPasswordForm:
*       properties:
*           password:
*               type: string
*
* /register:
*   post:
*       tags:
*           - User
*       description: User object that needs to be added to the application
*       summary: Create the new user
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
*               description: Invalid form data
*           500:
*               description: Internal server error
* /login:
*   post:
*       tags:
*           - User
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
*           403:
*               description: Invalid credentials (email and/or password)
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
* /profile:
*   get:
*       tags:
*           - User
*       description: User profile
*       summary: Get the user profile
*       produces:
*           - application/json
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
*           - User
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
*           401:
*               description: Unauthorized user
*           409:
*               description: Username is taken
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
* /account:
*   put:
*       tags:
*           - User
*       description: User object that needs to update his credentials
*       summary: Update the user credentials
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The user credentials to update
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AccountForm'
*       responses:
*           204:
*               description: User credentials updated
*           401:
*               description: Unauthorized user
*           409:
*               description: Email already used
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*   delete:
*       tags:
*           - User
*       description: User account to delete
*       summary: Delete the user account
*       produces:
*           - application/json
*       responses:
*           204:
*               description: User successfuly deleted
*           401:
*               description: Unauthorized user
*           500:
*               description: Internal server error
*
*   get:
*       tags:
*           - User
*       description: User account
*       summary: Get the user account
*       produces:
*           - application/json
*       responses:
*           200:
*               description: User email
*           401:
*               description: Unauthorized user
*           500:
*               description: Internal server error
*
* /account/password:
*    put:
*       tags:
*           - User
*       description: User object that needs to update his password
*       summary: Update the user password
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The user password to update
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/AccountForm'
*       responses:
*           204:
*               description: User password updated
*           401:
*               description: Unauthorized user
*           409:
*               description: Email already used
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
* /forgot:
*   post:
*       tags:
*           - User
*       description: User forgot his password
*       summary: Send email to the user to reset his password during 1 hours
*       produces:
*           - application/json
*       parameters:
*           - name: body
*             description: The email of the user which forgot the password
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/ForgotPasswordForm'
*       responses:
*           200:
*               description: Reset mail sent
*           404:
*               description: No user found
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /reset/{token}:
*   post:
*       tags:
*           - User
*       description: User reset his password
*       summary: Replace the password forgotten with the new one
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: token
*             schema:
*               type: string
*             required: true
*             description: Reset Token
*           - name: body
*             description: The new password of the user
*             in: body
*             required: true
*             schema:
*               $ref: '#/definitions/ResetPasswordForm'
*       responses:
*           204:
*               description: Password successfully reseted
*           403:
*               description: User can't reset his password
*           422:
*               description: Invalid form data
*           500:
*               description: Internal server error
*
* /users/{userId}:
*   get:
*       tags:
*           - User
*       description: Get a user (public profile, seen by anybody)
*       summary: Get a user
*       produces:
*           - application/json
*       parameters:
*           - in: path
*             name: userId
*             schema:
*               type: string
*             required: true
*             description: User ID
*       responses:
*           200:
*               description: User found
*           404:
*               description: User not found
*           500:
*               description: Internal server error
*/

module.exports = (router) => {
    router
        .post('/register', registerValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const user = await userController.signUp(req.body);
                res.status(201).send({ message: 'User successfully created.', user });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/login', loginValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                const userInfo = await userController.login(req.body.email, req.body.password);
                res.status(200).send({ message: 'Connected.', token: userInfo.token, userId: userInfo.userId });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/profile', Auth.isAuthenticated, async (req, res) => {
            try {
                const profile = await userController.getProfile(req.user._id);
                res.status(200).send({ profile });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/profile', Auth.isAuthenticated, [profileValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await userController.putProfile(req.user, req.body);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/account', Auth.isAuthenticated, [accountValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await userController.putAccount(req.user, req.body);
                res.sendStatus(204);
                // TODO: disconnect user if credentials change
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        // TODO: remove him from all boards(check if not the last admin) & teams
        .delete('/account', Auth.isAuthenticated, async (req, res) => {
            try {
                await userController.deleteAccount(req.user, req.body.username);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/account', Auth.isAuthenticated, async (req, res) => {
            try {
                const user = await userController.getAccount(req.user);
                res.status(200).send({ user });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/account/password', Auth.isAuthenticated, [passwordValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.user);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/forgot', [forgotValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await userController.forgot(req.body.email, req.headers.host);
                res.status(200).json({ message: 'Reset mail sent.' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/reset/:token', [resetValidator], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: 'Invalid form data' });
            }
            try {
                await userController.resetPassword(req.params.token, req.body.password);
                res.sendStatus(204);
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/users/:userId', async (req, res) => {
            try {
                const user = await userController.getUser(req.params.userId);
                res.status(200).send({ user });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

const { validationResult } = require('express-validator/check');
const userController = require('../controllers/users');
const Auth = require('../middlewares/auth');
const MyError = require('../util/error');
const {
    registerValidator, loginValidator, accountValidator, profileValidator,
    forgotValidator, resetValidator
} = require('../validators');


module.exports = (router) => {
    router
        .post('/register', registerValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                if (!req.body.fullName || !req.body.email || !req.body.password) throw new MyError(400, 'Missing Informations');
                await userController.postSignup(req.body);
                res.status(201).send({ message: 'user created' });
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
                res.status(200).send({ message: 'connected', token: authToken });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/profile', Auth.isAuthorized, async (req, res) => {
            try {
                const profile = await userController.getProfile(req.user);
                res.status(200).send({ profile });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .put('/profile', Auth.isAuthorized, [profileValidator], async (req, res) => {
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
        .put('/account', Auth.isAuthorized, [accountValidator], async (req, res) => {
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
        .delete('/account', Auth.isAuthorized, async (req, res) => {
            try {
                await userController.deleteAccount(req.user);
                res.status(200).send({ message: 'Account successfully deleted' });
                // TODO: disconnect user if credentials change
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .get('/account', Auth.isAuthorized, async (req, res) => {
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
                res.status(200).json({ message: 'Reset mail sent' });
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
                res.status(200).send({ message: 'Password successfully reseted' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        });
};

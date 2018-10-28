
const userController = require('../controllers/user');
const Auth = require('../middlewares/auth');
const MyError = require('../util/error');

module.exports = (router) => {
    router
        .post('/register', async (req, res) => {
            try {
                if (!req.body.fullname || !req.body.email || !req.body.password) throw new MyError(400, 'Missing Informations');
                await userController.postSignup(req.body);
                res.status(201).send({ message: 'user created' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/login', async (req, res) => {
            if (req.body.email && req.body.password && req.body.email !== '' && req.body.password !== '') {
                try {
                    const authToken = await userController.login(req.body.email, req.body.password);
                    res.status(200).send({ message: 'connected', token: authToken });
                } catch (e) {
                    res.status(e.status).send({ error: e.message });
                }
            } else {
                res.status(400).send({ error: 'Missing informations' });
            }
        })
        .post('/logout', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        })
        .post('/forgot', (req, res) => {
            res.sendStatus(200);
        })
        .get('/profile', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        })
        .put('/profile', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        });
};

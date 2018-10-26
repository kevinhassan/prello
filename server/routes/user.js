
const userController = require('../controllers/user');
const Authorization = require('../middlewares/auth');

module.exports = (router) => {
  router
    .post('/register', async (req, res) => {
      try {
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
    .post('/logout', Authorization, (req, res) => {
      res.sendStatus(200);
    })
    .post('/forgot', (req, res) => {
      res.sendStatus(200);
    })
    .get('/profile', Authorization, (req, res) => {
      res.sendStatus(200);
    })
    .put('/profile', Authorization, (req, res) => {
      res.sendStatus(200);
    });
};

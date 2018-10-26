
const userController = require('../controllers/user');

module.exports = (router) => {
  router
    .post('/register', async (req, res) => {
      if (req.body.name && req.body.email && req.body.username && req.body.password && req.body.name !== '' && req.body.email !== '' && req.body.username !== '' && req.body.password !== '') {
        try {
          const userData = await userController.postSignup(req.body);
          res.status(200).send({ message: 'user created', user: userData });
        } catch (e) {
          res.status(e.status).send({ error: e.message });
        }
      } else {
        res.status(400).send({ error: 'Missing informations' });
      }
    })
    .post('/login', async (req, res) => {
      if (req.body.username && req.body.password && req.body.username !== '' && req.body.password !== '') {
        try {
          const authToken = await userController.login(req.body.username, req.body.password);
          res.status(200).send({ message: 'connected', token: authToken });
        } catch (e) {
          res.status(e.status).send({ error: e.message });
        }
      } else {
        res.status(400).send({ error: 'Missing informations' });
      }
    })
    .post('/logout', (req, res) => {
      res.sendStatus(200);
    })
    .post('/forgot', (req, res) => {
      res.sendStatus(200);
    })
    .get('/profile', (req, res) => {
      res.sendStatus(200);
    })
    .put('/profile', (req, res) => {
      res.sendStatus(200);
    });
};

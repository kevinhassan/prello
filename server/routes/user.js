
const userController = require('../controllers/user');

module.exports = (router) => {
  router
    .post('/register', async (req, res) => {
      if (req.body.name && req.body.email && req.body.username && req.body.password && req.body.name !== '' && req.body.email !== '' && req.body.username !== '' && req.body.password !== '') {
        try {
          const user = await userController.postSignup(req.body);
          res.status(200).send({ message: 'user created', user });
        } catch (e) {
          res.status(e.status).send({ error: e.message });
        }
      } else {
        res.status(412).send({ error: 'Missing informations' });
      }
    })
    .post('/login', async (req, res) => {
      if (req.body.username && req.body.password && req.body.username !== '' && req.body.password !== '') {
        try {
          const token = await userController.login(req.body.username, req.body.password);
          res.status(200).send({ message: 'connected', token });
        } catch (e) {
          res.status(e.status).send({ error: e.message });
        }
      } else {
        res.status(412).send({ error: 'Missing informations' });
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

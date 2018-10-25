
const userController = require('../controllers/user');

module.exports = (router) => {
  router
    .post('/register', async (req, res) => {
      if (req.body.name && req.body.email && req.body.username && req.body.password && req.body.name !== ''  && req.body.email !== ''  && req.body.username !== '' && req.body.password !== '') {
        try {
          const user = await userController.postSignup(req.body.name, req.body.username, req.body.password, req.body.email);
          res.status(200).send({ message: 'user created', user: user});
        } catch (e) {
          res.status(e.status).send({ err: e.message });
        }
      } else {
        res.status(412).send({ err: 'Invalid informations' });
      }
    })
    .post('/login', async (req, res) => {
      if (req.body.username && req.body.password && req.body.username !== '' && req.body.password !== '') {
        try {
          const token = await userController.login(req.body.username, req.body.password);
          res.status(200).send({ message: 'connected', token: token });
        } catch (e) {
          res.status(e.status).send({ err: e.message });
        }
      } else {
        res.status(412).send({ err: 'Invalid informations' });
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

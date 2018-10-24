
const userController = require('../controllers/user');

module.exports = (router) => {
  router
    .post('/register', (req, res) => {
      res.sendStatus(200);
    })
    .post('/login', async (req, res) => {
      if (req.body.username && req.body.password && req.body.username !== '' && req.body.password !== '') {
        try {
          const token = await userController.login(req.body.username, req.body.password);
          res.status(200).send({ message: 'connected', token: token });
        } catch (e) {
          res.status(e.code).send({ err: e.message });
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

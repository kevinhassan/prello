const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorization = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res.status(403).send({ error: 'No token provided.' });
  }
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    }
    try {
      const user = await User.findOne({ _id: payload.id }).select('_id');
      req.user = user;
    } catch (e) {
      res.status(403).send({ error: 'User unauthorized.' });
    }
    next();
  });
};

module.exports = authorization;

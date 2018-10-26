const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

const authorization = (req, res, next) => {
  console.log(app.get('SECRET'));
  const token = req.headers['x-access-token'];
  const msg = { error: 'No token provided.' };
  if (!token) { res.status(500).send(msg); }

  jwt.verify(token, app.get('SECRET'), (err, decoded) => {
    const msg = { error: 'Failed to authenticate token.' };
    if (err) { res.status(500).send(msg); }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authorization;

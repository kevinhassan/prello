const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
};

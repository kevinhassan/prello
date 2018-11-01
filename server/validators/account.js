const { check } = require('express-validator/check');

module.exports = [
    check('password')
        .isLength({ min: 5 }),
    check('email')
        .isEmail()
];

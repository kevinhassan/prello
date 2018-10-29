const { check } = require('express-validator/check');

module.exports = [
    check('email')
        .isEmail()
        .withMessage('That email doesn‘t look right')
];

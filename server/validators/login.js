const { check } = require('express-validator/check');

module.exports = [
    check('password')
        .not().isEmpty()
        .withMessage('Password is required'),
    check('email')
        .isEmail()
        .withMessage('That email doesn‘t look right')
];

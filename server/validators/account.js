const { check } = require('express-validator/check');

module.exports = [
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password need to have at least 5 characters'),
    check('email')
        .isEmail()
        .withMessage('That email doesn‘t look right')
];

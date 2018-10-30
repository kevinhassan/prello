const { check } = require('express-validator/check');

module.exports = [
    check('password')
        .escape()
        .not().isEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password is required'),
    check('email')
        .escape()
        .trim()
        .isEmail()
        .withMessage('That email doesn‘t look right')
];

const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty()
        .escape()
        .withMessage('Fullname is required')
        .isString('Fullname need to be string')
        .withMessage('Fullname is required'),
    check('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('That email doesn‘t look right'),
    check('password')
        .not().isEmpty()
        .escape()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 5 })
        .withMessage('Password need to have at least 5 characters')
];

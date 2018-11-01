const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty()
        .escape()
        .isString(),
    check('email')
        .trim()
        .escape()
        .isEmail(),
    check('password')
        .not().isEmpty()
        .escape()
        .isString()
        .isLength({ min: 5 })
];

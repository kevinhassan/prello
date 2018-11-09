const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty()
        .escape(),
    check('initials')
        .not().isEmpty()
        .escape()
        .isLength({ min: 1, max: 4 }),
    check('biography')
        .escape()
        .isString()
];

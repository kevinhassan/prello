const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty()
        .trim(),
    check('initials')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 4 }),
    check('biography')
        .isString()
        .trim()
];

const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty(),
    check('initials')
        .not().isEmpty()
        .isLength({ min: 1, max: 2 }),
    check('username')
        .not().isEmpty()

];

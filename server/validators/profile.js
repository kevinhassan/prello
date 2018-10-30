const { check } = require('express-validator/check');

module.exports = [
    check('fullname')
        .not().isEmpty()
        .withMessage('Fullname is required'),
    check('initials')
        .not().isEmpty()
        .withMessage('Initials is required')
        .isLength({ min: 1, max: 2 })
        .withMessage('Initials need to have between 1 and 2 characters'),
    check('username')
        .not().isEmpty()
        .withMessage('Username is required')

];

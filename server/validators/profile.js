const { check } = require('express-validator/check');

module.exports = [
    check('fullName')
        .not().isEmpty()
        .withMessage('Fullname is required'),
    check('initials')
        .not().isEmpty()
        .withMessage('Initials is required')
        .isLength({ min: 1, max: 2 })
        .withMessage('Initials need to have between 1 and 2 characters'),
    check('userName')
        .not().isEmpty()
        .withMessage('Username is required')

];

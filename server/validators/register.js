const { check } = require('express-validator/check');

module.exports = [
    check('fullname')
        .not().isEmpty()
        .withMessage('Fullname is required'),
    check('email')
        .isEmail()
        .withMessage('That email doesn‘t look right'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('Password need to have at least 5 characters')
];

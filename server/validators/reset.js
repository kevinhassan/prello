const { check } = require('express-validator/check');

module.exports = [
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('Password need to have at least 5 characters')
];

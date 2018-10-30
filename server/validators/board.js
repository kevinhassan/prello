const { check } = require('express-validator/check');

const addBoard = [
    check('name')
        .not().isEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    check('visibility')
        .not().isEmpty()
        .withMessage('Visibility is required')
        .isString()
        .withMessage('Visibility must be a string')
        .trim()
        .escape()
        .isIn(['public', 'private'])
        .withMessage('Visibility value need to be private or public')
];
const updateBoardList = [
    check('lists')
        .escape()
        .custom(item => item)
        .withMessage('Lists is required')
        .isArray()
        .withMessage('Lists must be an array'),
];

module.exports = {
    addBoard,
    updateBoardList
};

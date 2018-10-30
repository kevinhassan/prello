const { check } = require('express-validator/check');

const addBoard = [
    check('name')
        .not().isEmpty()
        .isString(),
    check('visibility')
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
        .isIn(['public', 'private'])
];
const updateBoardList = [
    check('lists')
        .escape()
        .custom(item => item)
        .isArray(),
];

const changeVisibility = [
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

module.exports = {
    addBoard,
    updateBoardList,
    changeVisibility
};

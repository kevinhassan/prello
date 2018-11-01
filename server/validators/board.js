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

module.exports = {
    addBoard,
    updateBoardList
};

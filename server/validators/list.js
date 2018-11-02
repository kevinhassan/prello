const { check } = require('express-validator/check');

const addList = [
    check('name')
        .not().isEmpty()
        .isString(),
    check('boardId')
        .not().isEmpty()
        .isString(),
];

module.exports = {
    addList,
};

const { check } = require('express-validator/check');

const addList = [
    check('name')
        .not().isEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    check('boardId')
        .not().isEmpty()
        .withMessage('BoardId is required')
        .isString()
        .withMessage('BoardId must be a string')
];

module.exports = {
    addList,
};

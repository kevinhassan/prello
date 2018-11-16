const { check } = require('express-validator/check');

const moveCard = [
    check('index')
        .not().isEmpty()
        .isNumeric(),
    check('sourceListId')
        .not().isEmpty()
        .isString(),
];

const addList = [
    check('name')
        .not().isEmpty()
        .isString()
];

const addCard = [
    check('name')
        .not().isEmpty()
        .isString()
];

const archiveCard = [
    check('isArchived')
        .not().isEmpty()
        .isBoolean()
];

const changeName = [
    check('name')
        .not().isEmpty()
        .isString()
        .trim()
        .isLength({ min: 1 })
];

module.exports = {
    moveCard,
    addList,
    addCard,
    archiveCard,
    changeName
};

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

module.exports = {
    moveCard,
    addList,
    addCard,
    archiveCard
};

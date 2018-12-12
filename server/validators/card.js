const { check } = require('express-validator/check');

const addCard = [
    check('name')
        .not().isEmpty()
        .isString(),
    check('list')
        .not().isEmpty()
        .isString(),
];

const addLabel = [
    check('cardId')
        .not().isEmpty()
        .isString(),
    check('labelId')
        .not().isEmpty()
        .isString()
];

const deleteLabel = [
    check('cardId')
        .not().isEmpty()
        .isString(),
    check('labelId')
        .not().isEmpty()
        .isString()
];

const updateCardDescription = [
    check('description')
        .isString(),
];

const updateCardName = [
    check('name')
        .isString()
        .trim()
        .isLength({ min: 1 }),
];

const editDate = [
    check('dueDate')
        .isString(),
];

module.exports = {
    addCard,
    addLabel,
    deleteLabel,
    updateCardDescription,
    updateCardName,
};

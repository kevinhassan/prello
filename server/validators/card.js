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
    check('labelId')
        .not().isEmpty()
        .isString()
];

const deleteLabel = [
    check('labelId')
        .not().isEmpty()
        .isString()
];

const updateCardDescription = [
    check('description')
        .isString(),
];

module.exports = {
    addCard,
    addLabel,
    deleteLabel,
    updateCardDescription
};

const { check } = require('express-validator/check');

const addCard = [
    check('name')
        .not().isEmpty()
        .isString()
];

const updateCardDescription = [
    check('description')
        .isString(),
];

module.exports = {
    addCard,
    updateCardDescription
};

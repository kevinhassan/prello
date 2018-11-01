const { check } = require('express-validator/check');

const updateCardDescription = [
    check('description')
        .isString(),
];

module.exports = {
    updateCardDescription
};

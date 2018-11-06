const { check } = require('express-validator/check');

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
module.exports = {
    addList,
    addCard
};

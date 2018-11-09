const { check } = require('express-validator/check');

const searchMember = [
    check('username')
        .not().isEmpty()
        .escape()
        .isString()
];

module.exports = {
    searchMember
};

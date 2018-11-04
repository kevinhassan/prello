const { check } = require('express-validator/check');

const addTeam = [
    check('name')
        .not().isEmpty()
];

const addMember = [
    check('email')
        .not().isEmpty()
        .isEmail(),
];
const removeMember = [
    check('member')
        .not().isEmpty()
        .isString(),
];
const changeAccess = [
    check('isAdmin')
        .not().isEmpty()
        .trim()
        .escape()
        .isBoolean()
];

module.exports = {
    addTeam,
    addMember,
    removeMember,
    changeAccess
};

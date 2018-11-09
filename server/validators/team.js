const { check } = require('express-validator/check');

const addTeam = [
    check('name')
        .not().isEmpty()
        .isString()
];
const addMember = [
    check('member')
        .not().isEmpty()
        .isString(),
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
const changeInformation = [
    check('name')
        .not().isEmpty()
        .escape()
        .isString(),
    check('description')
        .escape()
        .isString()
];
module.exports = {
    addTeam,
    addMember,
    removeMember,
    changeAccess,
    changeInformation
};

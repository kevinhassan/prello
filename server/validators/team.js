const { check } = require('express-validator/check');

const addTeam = [
    check('name')
        .not().isEmpty()
        .isString()
];
const addMember = [
    check('username')
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
const changeName = [
    check('name')
        .not().isEmpty()
        .escape()
        .isString()
];
const changeDescription = [
    check('description')
        .escape()
        .isString()
];
const changeVisibility = [
    check('isVisible')
        .not().isEmpty()
        .escape()
        .isBoolean()
];
module.exports = {
    addTeam,
    addMember,
    removeMember,
    changeAccess,
    changeName,
    changeDescription,
    changeVisibility
};

const { check } = require('express-validator/check');

const addBoard = [
    check('name')
        .not().isEmpty()
        .isString(),
    check('visibility')
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
        .isIn(['public', 'private', 'team'])
];

const updateBoardLists = [
    check('lists')
        .escape()
        .custom(item => item)
        .isArray(),
];

const changeVisibility = [
    check('visibility')
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
        .isIn(['public', 'private', 'team'])
];

const changeIsArchived = [
    check('isArchived')
        .not().isEmpty()
        .isBoolean()
];

const addMember = [
    check('email')
        .not().isEmpty()
        .trim()
        .escape()
        .isEmail()
];
const addTeam = [
    check('team')
        .not().isEmpty()
        .trim()
        .escape()
        .isString()
];

const changeAccess = [
    check('isAdmin')
        .not().isEmpty()
        .trim()
        .escape()
        .isBoolean()
];

const createLabel = [
    check('name')
        .not().isEmpty()
        .trim()
        .isString(),
    check('color')
        .not().isEmpty()
        .trim()
        .matches('^#(?:[0-9a-fA-F]{3}){2}$')
        .isString(),
];

module.exports = {
    addBoard,
    addMember,
    addTeam,
    changeAccess,
    changeIsArchived,
    changeVisibility,
    createLabel,
    updateBoardLists,
};

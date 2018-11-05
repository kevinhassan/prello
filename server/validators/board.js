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

module.exports = {
    addBoard,
    updateBoardLists,
    changeVisibility,
    addMember,
    addTeam,
    changeAccess
};

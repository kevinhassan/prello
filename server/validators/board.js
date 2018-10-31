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
const updateBoardList = [
    check('lists')
        .escape()
        .custom(item => item)
        .isArray(),
];

const changeVisibility = [
    check('visibility')
        .not().isEmpty()
        .withMessage('Visibility is required')
        .isString()
        .withMessage('Visibility must be a string')
        .trim()
        .escape()
        .isIn(['public', 'private'])
        .withMessage('Visibility value need to be private or public')

];
const addMember = [
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Email doesn\t seem right !'),
];
const addTeam = [
    check('team')
        .not().isEmpty()
        .withMessage('Team is required')
        .trim()
        .escape()
        .isString()
        .withMessage('Team need to be a string'),


];
module.exports = {
    addBoard,
    updateBoardList,
    changeVisibility,
    addMember,
    addTeam
};

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
const addAdmin = [
    check('member')
        .not().isEmpty()
        .isString(),
];
const removeAdmin = [
    check('member')
        .not().isEmpty()
        .isString(),
];
module.exports = {
    addTeam,
    addMember,
    removeMember,
    addAdmin,
    removeAdmin
};

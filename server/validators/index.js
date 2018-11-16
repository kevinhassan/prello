const accountValidator = require('./account');
const boardValidator = require('./board');
const cardValidator = require('./card');
const forgotValidator = require('./forgot');
const loginValidator = require('./login');
const profileValidator = require('./profile');
const registerValidator = require('./register');
const resetValidator = require('./reset');
const listValidator = require('./list');
const teamValidator = require('./team');
const passwordValidator = require('./password');

module.exports = {
    accountValidator,
    boardValidator,
    cardValidator,
    forgotValidator,
    loginValidator,
    profileValidator,
    registerValidator,
    resetValidator,
    listValidator,
    passwordValidator,
    teamValidator,
};

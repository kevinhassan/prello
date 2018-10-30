const loginValidator = require('./login');
const registerValidator = require('./register');
const profileValidator = require('./profile');
const accountValidator = require('./account');
const forgotValidator = require('./forgot');
const resetValidator = require('./reset');
const boardValidator = require('./board');

module.exports = {
    loginValidator,
    registerValidator,
    profileValidator,
    accountValidator,
    forgotValidator,
    resetValidator,
    boardValidator
};

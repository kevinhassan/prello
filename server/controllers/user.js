const userController = {};
const User = require('../models/User');
const MyError = require('../util/error');

/**
 * POST /login
 * Sign in using email and password.
 */
userController.login = async (username, password) => {
  try {
    const user = await User.findOne({ username }).select('password');

    if (!user) {
      throw new MyError(401, 'invalid credentials');
    }

    // check password
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      throw new MyError(401, 'invalid credentials');
    }

    // return token to the user
    return 'false token';
  } catch (err) {
    if (!err.status) {
      throw new MyError(500, 'Internal Server Error');
    }
    throw err;
  }
};

/**
 * GET /logout
 * Log out.
 */
userController.logout = () => { };


/**
 * POST /signup
 * Create a new local account.
 */
userController.postSignup = async (data) => {
  const user = new User({
    name: data.name,
    username: data.username,
    password: data.password,
    email: data.email
  });
  try {
    const newUser = await user.save();
    return newUser;
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new MyError(409, 'User already exists');
    }
    throw new MyError(500, 'Internal Server Error');
  }
};

/**
 * GET /account
 * Profile page.
 */
userController.getAccount = () => { };

/**
 * POST /account/profile
 * Update profile information.
 */
userController.postUpdateProfile = () => { };

/**
 * POST /account/password
 * Update current password.
 */
userController.postUpdatePassword = () => { };

/**
 * POST /account/delete
 * Delete user account.
 */
userController.postDeleteAccount = () => { };

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
userController.getOauthUnlink = () => { };

/**
 * GET /reset/:token
 * Reset Password page.
 */
userController.getReset = () => { };

/**
 * POST /reset/:token
 * Process the reset password request.
 */
userController.postReset = () => { };

/**
 * GET /forgot
 * Forgot Password page.
 */
userController.getForgot = () => { };

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
userController.postForgot = () => { };

module.exports = userController;

const userController = {};
const User = require('../models/User');
/**
 * POST /login
 * Sign in using email and password.
 */
userController.login = async (username, password) => {
  const error = new Error('Internal Server Error');
  error.status = 500;
  try {
    const user = await User.findOne({ username }).select('password');
    if (!user) {
      error.message = 'invalid credential';
      error.status = 401;
      throw error;
    }
    // check password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      error.message = 'invalid credential';
      error.status = 401;
      throw error;
    }
    // return token to the user
  } catch (e) {
    throw error;
  }
};

/**
 * GET /logout
 * Log out.
 */
userController.logout = () => {};


/**
 * POST /signup
 * Create a new local account.
 */
userController.postSignup = () => {};

/**
 * GET /account
 * Profile page.
 */
userController.getAccount = () => {};

/**
 * POST /account/profile
 * Update profile information.
 */
userController.postUpdateProfile = () => {};

/**
 * POST /account/password
 * Update current password.
 */
userController.postUpdatePassword = () => {};

/**
 * POST /account/delete
 * Delete user account.
 */
userController.postDeleteAccount = () => {};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
userController.getOauthUnlink = () => {};

/**
 * GET /reset/:token
 * Reset Password page.
 */
userController.getReset = () => {};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
userController.postReset = () => {};

/**
 * GET /forgot
 * Forgot Password page.
 */
userController.getForgot = () => {};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
userController.postForgot = () => {};

module.exports = userController;

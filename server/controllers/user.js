const userController = {};
/**
 * POST /login
 * Sign in using email and password.
 */
userController.login = (username, password) => {
  const exist = false;
  if (!exist) {
    const err = new Error('Invalid credentials');
    err.code = 403;
    throw err;
  } else {
    return 'myToken';
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

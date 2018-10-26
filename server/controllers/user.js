const userController = {};
const User = require('../models/User');
const MyError = require('../util/error');
const Auth = require('../auth');

/**
 * POST /login
 * Sign in using email and password.
 */
userController.login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select('password');
    if (!user) {
      throw new MyError(401, 'invalid credentials');
    }

    // check password
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      throw new MyError(401, 'invalid credentials');
    }

    // return token to the user
    return Auth.generateToken(user);
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
  try {
    const fullnameUser = `${data.nickname} ${data.name}`.replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[^\w\s]/gi, '');
    // count the number of user with same fullname
    const count = await User.estimatedDocumentCount({ fullname: fullnameUser }) + 1;

    const usernameUser = fullnameUser.toLowerCase().replace(/ /g, '') + count;
    const user = new User({
      fullname: fullnameUser,
      username: usernameUser,
      password: data.password,
      email: data.email,
      bio: data.bio,
      avatarUrl: data.avatarUrl
    });
    const newUser = await user.save();
    return newUser;
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new MyError(409, 'User already exists');
    } else if (err.name === 'ValidationError') {
      throw new MyError(400, 'Missing Informations');
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

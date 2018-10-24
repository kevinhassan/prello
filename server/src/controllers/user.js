/**
 * GET /login
 * Login page.
 */
export let getLogin = (req, res) => {
    res.status(200);
    res.send("ok get login");
};

/**
 * POST /login
 * Sign in using email and password.
 */
export let postLogin = (req, res) => {
     if (req.body.username != undefined && req.body.password != undefined && req.body.username != "" && req.body.password != "") {
        res.status(200);
        res.send({token: "connected"});
    } else {
        res.status(302);
        res.send({token: "error at login"});
    }
};

/**
 * GET /logout
 * Log out.
 */
export let logout = (req, res) => {};

/**
 * GET /signup
 * Signup page.
 */
export let getSignup = (req, res) => {
    res.status(200);
    res.send("ok get signup");
};

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = (req, res) => {};

/**
 * GET /account
 * Profile page.
 */
export let getAccount = (req, res) => {};

/**
 * POST /account/profile
 * Update profile information.
 */
export let postUpdateProfile = (req, res) => {};

/**
 * POST /account/password
 * Update current password.
 */
export let postUpdatePassword = (req, res) => {};

/**
 * POST /account/delete
 * Delete user account.
 */
export let postDeleteAccount = (req, res) => {};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export let getOauthUnlink = (req, res) => {};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export let getReset = (req, res) => {};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export let postReset = (req, res) => {};

/**
 * GET /forgot
 * Forgot Password page.
 */
export let getForgot = (req, res) => {};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export let postForgot = (req, res) => {};

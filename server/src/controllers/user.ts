import { Request, Response, NextFunction } from "express";


/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response) => {
    res.status(200);
    res.send("ok get login");
};

/**
 * POST /login
 * Sign in using email and password.
 */
export let postLogin = (req: Request, res: Response, next: NextFunction) => {
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
export let logout = (req: Request, res: Response) => {};

/**
 * GET /signup
 * Signup page.
 */
export let getSignup = (req: Request, res: Response) => {
    res.status(200);
    res.send("ok get signup");
};

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /account
 * Profile page.
 */
export let getAccount = (req: Request, res: Response) => {};

/**
 * POST /account/profile
 * Update profile information.
 */
export let postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {};

/**
 * POST /account/password
 * Update current password.
 */
export let postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {};

/**
 * POST /account/delete
 * Delete user account.
 */
export let postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export let getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export let getReset = (req: Request, res: Response, next: NextFunction) => {};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export let postReset = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /forgot
 * Forgot Password page.
 */
export let getForgot = (req: Request, res: Response) => {};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export let postForgot = (req: Request, res: Response, next: NextFunction) => {};

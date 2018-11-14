const resetPasswordMail = (email, token) => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Reset your password on Prello',
    html: `
    <p>
        Hello,
    </p>
    <p>
        You are receiving this email because you (or someone else) have requested the reset of the password for your account.
    </p>
    <p>
        Please click on the following link, or paste this into your browser to complete the process:
    </p>
    <p>
        <a href=${process.env.CLIENT_URI}/reset/${token}>Link</a>
    </p>
    <p>
        If you did not request this, please ignore this email and your password will remain unchanged.
    </p>
    `
});
const confirmResetPasswordMail = email => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Your Prello app password has been changed',
    html: `
    <p>
        Hello,
    </p>
    <p>
        This is a confirmation that the password for your account ${email} has just been changed.
    </p>
    `
});

const confirmAccountCreationMail = email => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Your account on Prello app has been created',
    text: `
    <p>
        Hello,
    </p>
    <p>
        Your account has been created with the ${email}
    </p>
    `
});

module.exports = { resetPasswordMail, confirmResetPasswordMail, confirmAccountCreationMail };

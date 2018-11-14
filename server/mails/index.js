const resetPasswordMail = (email, host, token) => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Reset your password on Prello',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${process.env.CLIENT_URI}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`

});
const confirmResetPasswordMail = email => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Your Prello app password has been changed',
    text: `Hello,\n\nThis is a confirmation that the password for your account ${email} has just been changed.\n`
});

const confirmAccountCreationMail = email => ({
    to: email,
    from: process.env.MAILJET_MAIL,
    subject: 'Your account on Prello app has been created',
    text: `Hello,\n\nYour account has been created with the ${email}.\n`
});

module.exports = { resetPasswordMail, confirmResetPasswordMail, confirmAccountCreationMail };

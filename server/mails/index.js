const nodemailer = require('nodemailer');
const logger = require('../util/logger');

const transporter = nodemailer.createTransport({
    service: 'Mailjet',
    auth: {
        user: process.env.MAILJET_USER,
        pass: process.env.MAILJET_PASSWORD
    }
});


const resetPasswordMail = async (email, token) => {
    try {
        if (process.env.MAILJET_USER && process.env.MAILJET_MAIL && process.env.MAILJET_PASSWORD && process.env.ENVIRONMENT === 'production') {
            logger.info('Sending reset password mail');
            return {
                to: email,
                from: process.env.MAILJET_MAIL,
                subject: 'Prello - Reset password',
                html: `
                <p>
                    Hello,
                </p>
                <p>
                    You are receiving this email because you (or someone else) has requested the reset of your password.
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
            };
        }
    } catch (err) {
        throw err;
    }
};
const confirmResetPasswordMail = async (email) => {
    try {
        if (process.env.MAILJET_USER && process.env.MAILJET_MAIL && process.env.MAILJET_PASSWORD && process.env.ENVIRONMENT === 'production') {
            logger.info('Sending confirmation reset password mail');
            return {
                to: email,
                from: process.env.MAILJET_MAIL,
                subject: 'Prello - Password changed',
                html: `
                <p>
                    Hello,
                </p>
                <p>
                    This is a confirmation that the password for your account ${email} has just been changed.
                </p>
                `
            };
        }
    } catch (err) {
        throw err;
    }
};

const confirmAccountCreationMail = async (email) => {
    if (process.env.MAILJET_USER && process.env.MAILJET_MAIL && process.env.MAILJET_PASSWORD && process.env.ENVIRONMENT === 'production') {
        logger.info('Sending register confirmation mail');
        try {
            await transporter.sendMail({
                to: email,
                from: process.env.MAILJET_MAIL,
                subject: 'Prello - Account created',
                text: `
                <p>
                    Hello,
                </p>
                <p>
                    Your Prello account has been successfully created using this email.
                </p>
                `
            });
        } catch (err) {
            throw err;
        }
    }
};

module.exports = { resetPasswordMail, confirmResetPasswordMail, confirmAccountCreationMail };

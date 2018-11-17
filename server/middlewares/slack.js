/**
 * Check if the token of the req is valid
 */
const isTokenValid = (req, res, next) => {
    try {
        if (req.param('token') === process.env.SLACK_VERIFICATION_TOKEN) next();
        return;
    } catch (e) {
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    isTokenValid
};

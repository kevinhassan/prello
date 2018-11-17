
const { Strategy: SlackStrategy } = require('passport-slack');
const User = require('../../models/User');


module.exports = (passport) => {
    passport.use(new SlackStrategy({
        clientID: process.env.SLACK_ID,
        clientSecret: process.env.SLACK_SECRET,
        callbackURL: '/auth/slack/callback',
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log(req);
        console.log(req.user);
        // optionally persist profile data
        done(null, profile);
    }));
};

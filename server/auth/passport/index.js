const { Strategy: GitHubStrategy } = require('passport-github');
const User = require('../../models/User');


module.exports = (passport) => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    }, ((async (req, accessToken, refreshToken, profile, done) => {
        try {
            if (req.user) {
                const existingUser = await User.findOne({ 'github.id': profile.id });
                if (existingUser) return done(null, existingUser);
                const user = await User.findById(req.user._id);
                user.github = { token: accessToken, id: profile.id };
                user.fullName = user.fullName || profile.displayName;
                user.bio = profile.bio;
                user.avatarUrl = user.avatarUrl || profile._json.avatar_url;
                return done(null, await user.save());
            }
            const existingUser = await User.findOne({ 'github.id': profile.id });
            if (existingUser) return done(null, existingUser);
            let user = await User.findOne({ email: profile._json.email });
            if (!user) {
                user = new User();
            }
            user.github = { token: accessToken, id: profile.id };
            user.fullName = user.fullName || profile.displayName;
            user.bio = user.biography || profile.bio;
            user.avatarUrl = user.avatarUrl || profile._json.avatar_url;
            return done(null, await user.save());
        } catch (err) {
            return done(err, null);
        }
    }))));
};

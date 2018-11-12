const { Strategy: GitHubStrategy } = require('passport-github');
const User = require('../../models/User');


module.exports = (passport) => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        if (req.user) {
            User.findOne({ 'github.id': profile.id }, (err, existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    User.findById(req.user.id, (err, user) => {
                        if (err) { return done(err); }
                        user.github = { token: accessToken, id: profile.id };
                        user.fullName = user.fullName || profile.displayName;
                        user.bio = profile.bio;
                        user.avatarUrl = user.avatarUrl || profile._json.avatar_url;
                        user.save((err) => {
                            done(err, user);
                        });
                    });
                }
            });
        } else {
            User.findOne({ 'github.id': profile.id }, (err, existingUser) => {
                if (err) { return done(err); }
                if (existingUser) {
                    return done(null, existingUser);
                }
                User.findOne({ email: profile._json.email }, (err, existingUser) => {
                    if (err) { return done(err); }
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        const user = new User();
                        user.github = { token: accessToken, id: profile.id };
                        user.fullName = user.fullName || profile.displayName;
                        user.bio = profile.bio;
                        user.avatarUrl = user.avatarUrl || profile._json.avatar_url;
                        user.save((err) => {
                            done(err, user);
                        });
                    }
                });
            });
        }
    }));
};

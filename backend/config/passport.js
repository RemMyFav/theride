const GooglesStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../structure/userStructure");
const Profile = require("../structure/profileStructure");
const Currency = require("../structure/currencyStructure");

module.exports = function (passport) {
    passport.use(
        new GooglesStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    username: profile.displayName,
                    email: profile.emails[0].value,
                };
                try {
                    let user = await User.findOne({
                        username: profile.displayName,
                    });
                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        await Profile.create({
                            name: user.username,
                            id: user._id,
                            createDate: new Date(),
                        });
                        await Currency.create({
                            userID: user._id,
                            amount: 0,
                        });
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

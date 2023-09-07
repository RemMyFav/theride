const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
//Google OAuth
router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000",
    }),
    (req, res) => {
        const user = req.user;
        res.cookie("token", createJWT(user._id), {
            expires: new Date(Date.now() + 900000000),
            httpOnly: true,
            secure: true,
        }).redirect("http://localhost:3000");
    }
);
module.exports = router;

/*
    This file contains all the routes for the user
    It is imported into the server.js file
    It contains all the api calls for the user
*/
const express = require("express");
const router = express.Router();
const authed = require("../middleware/authCheck.js");
const {
    getUser,
    registerUser,
    loginUser,
    logOut,
    getAllUsers,
    changeUserPassword,
    getToken,
} = require("../controllers/userControllers");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.get("/", getAllUsers);
router.patch("/changeUserPassword", changeUserPassword);
router.get("/getToken", getToken);
router.get("/:userId", getUser);
module.exports = router;

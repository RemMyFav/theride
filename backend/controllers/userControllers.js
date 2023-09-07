/*
    This file contains all the functions that are used to handle user requests
    It is imported into the userRoutes.js file
    It contains all the functions for the user
*/
const asyncHandler = require("express-async-handler");
const Users = require("../structure/userStructure");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

const getToken = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Users.findById(decoded.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Register a new user(require username, password and email)
//POST /api/user/
const registerUser = asyncHandler(async (req, res) => {
  //Check required fields
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Missing: required fields");
  }
  //Check if user already exists
  const user = await Users.findOne({ username });
  if (user) {
    res.status(404);
    throw new Error(`username: ${username} is taken, please try another`);
  }
  //Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  //Create user
  const newUser = await Users.create({
    username,
    password: hashed,
    email,
  });
  if (newUser) {
    res
      .status(201)
      .cookie("token", createJWT(newUser._id), {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      })
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: createJWT(newUser._id),
      });
  }
  //Send error failed to create user
  else {
    res.status(400);
    throw new Error("User not created");
  }
});

//Login a user(require username and password)
//POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  //Check required fields
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Missing: username, password");
  }
  //Check if user exists and password is correct
  const user = await Users.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    res.status(401);
    throw new Error("Username or password is incorrect");
  }
  //Send response
  if (user && result) {
    res
      .status(201)
      .cookie("token", createJWT(user._id), {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      })
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: createJWT(user._id),
      });
  }
  //Send error faild to login
  else {
    res.status(400);
    throw new Error("User not logged in");
  }
});

//user logout
//PATCH /api/user/logout
const logOut = asyncHandler(async (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.status(400);
            throw new Error("Failed to logout");
        }
        res.status(201)
            .cookie("token", "nothing", {
                httpOnly: true,
                expires: new Date(Date.now() + 1),
                httpOnly: true,
                secure: true,
            })
            .json({
                message: "Logged out",
            });
    });
});

//Change user info like usernmae and email
//PATCH /api/user/changeUserPassword
const changeUserPassword = asyncHandler(async (req, res) => {
  const { _id, username, email, password } = req.body;

  //Check if user has a password, if no then it's a google authenticated user
  var user = await Users.findOne({ _id });
  if (!user.password) {
    res.status(404);
    throw new Error(`${username}, you can't change password!`);
  }
  if (!user) {
    res.status(404)
    throw new Error(`user doesn't exist`);
  }

  //   change user password
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    result = await Users.updateOne(
    { _id: user._id },
    { $set: { username: user.username,
                email: user.email,
                password: hashed } }
    );

    if (result.modifiedCount == 0) {
        res.status(400);
        throw new Error("failed to modify password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Request");
  }



  res
    .status(201)
    .cookie("token", createJWT(user._id), {
      expires: new Date(Date.now() + 900000000),
      httpOnly: true,
      secure: true,
    })
    .json({
      _id: user._id,
      username: username,
      email: email,
      token: createJWT(user._id),
    });
});

//Get user by id
//GET /api/user/:userId
const getUser = asyncHandler(async (req, res) => {
  const user = await Users.find({ _id: req.params.userId }).select([
    "email",
    "username",
  ]);
  if (user.length > 0) {
    res.status(200).json(user);
  }
  //Send error faild to find user
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Get all users
//GET /api/user/all
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Users.find().select(["email", "username"]);
  res.json(users);
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getAllUsers,
  changeUserPassword,
  getUser,
  getToken,
};

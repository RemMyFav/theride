/*
  This is the main server file for the backend
  It connects to the database, api routers and starts the server
  To start the server run "npm run dev" in the backend directory
  And the terminal will display the port the server is running on
  status of the server will be displayed in the terminal
*/
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connection = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const http = require("http");
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require("body-parser");
const { userJoin, getCurrentUser, getRoomUsers } = require("./utils/users");
require("./config/passport")(passport);

// Connect to the database
connection();

//Socket.io
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("User connected " + socket.id);
  // When a ta or student accept a question, put him in the room
  socket.on("joinQuestion", ({ userID, room }) => {
    // const user = userJoin(socket.id, userID, room);
    let roomID = room.questionID + room.taID
    console.log(`User ${userID} joined room ${roomID}`);
    userJoin(socket, room);
  });

  // When a ta or student sends a message, send it to the student and the ta who sent it
  socket.on("sendMessage", (data) => {
    // Check if the user is in the room
    // const usersInRoom = getRoomUsers(data.room);

    let roomId = data.room.questionID + data.room.taID;

    console.log(`User sent message ${data.context} to room ${roomId}`);
    // Server sends the message to the room(ta and student)
    socket.to(roomId).emit("message", data);
  });

  // When a ta or student want to reject a question, remove everyone from the room
  socket.on("rejectQuestion", (room) => {
    // Check if the user is in the room
    const usersInRoom = getRoomUsers(room);
    if (!usersInRoom.includes(socket.id)) {
      throw new Error("User not in the room");
    }
    const user = getCurrentUser(socket.id);
    if (!user) {
      throw new Error("Can't find user");
    }
    console.log(`User ${user.username} rejected question in ${room}`);
    // kick everyone out of the room
    usersInRoom.forEach((one) => {
      one.socketID.leave(room);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected " + socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:3001",
    ],
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Routes for the api
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/auth", require("./routes/googleRoutes"));
app.use("/api/currency", require("./routes/currencyRoutes"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server on http://127.0.0.1:${port}/`.bgGreen)
);

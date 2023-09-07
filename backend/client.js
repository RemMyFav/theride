// connect to the server
const socket = io();

// room = {questionID, taID}
// Tell the server to join the room (Click accept question(ta) or click caht window(student) button will trigger this)
const acceptQuestion = (userID, room) => {
    socket.emit("joinQuestion", { userID, room });
};

//context = "string"
// Tell the server that someone is sending a message (Click send message button will trigger this)
const sendMessage = (context, room) => {
    socket.emit("sendMessage", { context, room });
};

//Tell the serve that I reject this question (Click disconnect button will trigger this)
const rejectQuestion = (room) => {
    socket.emit("rejctQuestion", room);
};

// message = {username, text}
// Receive message from server
socket.on("message", (message) => {
    console.log(message);
    // Display message in the chat
});

//Quit the socket connection completely
socket.disconnect();

// // When the server wants the owner of a question to join a room, join it
// socket.on("forceJoin", (room) => {
//     console.log(`Server wants the owner which is me to join room ${room}`);
//     socket.join(room);
// });

// // Tell the server to create a question room for both ta and student (Click create question button will trigger this)
// const createQuestion = (questionID) => {
//     socket.emit("createQuestion", questionID);
// };

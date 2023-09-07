import io from "socket.io-client";

const socket = io("http://localhost:3001");

// room = {questionID, taID}
// Tell the server to join the room (Click accept question(ta) or click caht window(student) button will trigger this)
export const joinQuestion = (userID, room) => {
	console.log(`user ${userID} joind room: ${room.questionID}${room.taID}`);
  socket.emit("joinQuestion", { userID, room });
};

export default socket;

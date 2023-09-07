// Join to a room
function userJoin(socket, room) {
  let roomID = room.questionID + room.taID;

  if (roomID && !roomID.includes("undefined")) {
    socket.join(roomID);
  }
}

// Get current user
function getCurrentUser(socketID) {
  return users.find((user) => user.socketID === socketID);
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUsers,
};

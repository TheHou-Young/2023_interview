const { v4: uuidv4 } = require("uuid");

const generateRoomId = () => {
  const roomId = uuidv4();
  return roomId;
};

module.exports = { generateRoomId };

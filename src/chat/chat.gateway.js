const websocketPlugin = require('@fastify/websocket');
const  Message = require('../models/Message');

const roomSockets = new Map(); 
async function chatGateway(fastify) {
  
  await fastify.register(websocketPlugin);

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    let user;

    try {
      user = fastify.jwt.verify(token);      
    } catch (err) {
      connection.socket.close();
      return;
    }

    let currentRoom = '';

    connection.socket.on('message', async (rawMsg) => {
      let msg;
      try {
        msg = JSON.parse(rawMsg.toString());
      } catch (err) {
        return;
      }

      if (msg.type === 'join') {
        currentRoom = msg.roomId;
        if (!roomSockets.has(currentRoom)) {
          roomSockets.set(currentRoom, new Set());
        }
        roomSockets.get(currentRoom).add(connection);
        return;
      }

      const { roomId, content } = msg;

      const saved = await Message.create({
        senderId: user.id,
        content,
        roomId,
      });

      const messageData = {
        ...saved.toObject(),
        type: 'new_message',
      };

      const socketsInRoom = roomSockets.get(roomId);
      if (socketsInRoom) {
        for (const conn of socketsInRoom) {
          conn.socket.send(JSON.stringify(messageData));
        }
      }
    });

    connection.socket.on('close', () => {
      if (currentRoom && roomSockets.has(currentRoom)) {
        roomSockets.get(currentRoom).delete(connection);
        if (roomSockets.get(currentRoom).size === 0) {
          roomSockets.delete(currentRoom);
        }
      }
    });
  });
}

module.exports = { chatGateway };

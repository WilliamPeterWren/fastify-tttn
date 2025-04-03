const chatService = require('./chat.service');

async function getMessagesHandler (req, reply) {
  const { roomId } = req.params;
  const before = req.query.before;

  const messages = await chatService.getMessages(roomId, 10, before);
  return reply.send(messages);
};


async function postMessageHandler(req, reply){
  try {
    const { roomId } = req.params;
    const { content } = req.body;
    const senderId = req.user.userId;

    if (!content || !senderId) {
      return reply.code(400).send({ error: "Missing content or sender" });
    }

    const saved = await chatService.saveMessage(roomId, { senderId, content });

    req.server.io.to(roomId).emit("message", saved);

    return reply.code(201).send(saved);
  } catch (err) {
    console.error("Error in postMessageHandler:", err);
    return reply.code(500).send({ error: "Cannot save message", details: err.message });
  }
};

module.exports = { getMessagesHandler, postMessageHandler };

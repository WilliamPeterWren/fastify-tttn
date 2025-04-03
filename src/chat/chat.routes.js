const chatController = require('./chat.controller');

async function chatRoutes (fastify) {
  fastify.get('/:roomId/messages', { preHandler: [fastify.authenticate] }, chatController.getMessagesHandler);
  fastify.post('/:roomId/messages', { preHandler: [fastify.authenticate] }, chatController.postMessageHandler); 
};

module.exports = chatRoutes;
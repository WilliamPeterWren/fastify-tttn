const Message = require('../models/Message');

const getMessages = async (roomId, limit = 10, beforeTime) => {
  try {
    const filter = { roomId };
    if (beforeTime) {
      filter.createdAt = { $lt: new Date(beforeTime) };
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({
        path: 'senderId',
        select: 'email'
      })
      .lean();

    return messages.reverse();
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};


const saveMessage = async (roomId, message) => {
  const newMessage = new Message({
    roomId,
    senderId: message.senderId,
    content: message.content,
    createdAt: new Date(),
  });
  await newMessage.save();
  return await newMessage.populate('senderId', 'email');
};

module.exports = {
  getMessages,
  saveMessage,
}
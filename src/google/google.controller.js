// googleController.js

const googleService = require('./google.service');

exports.login = async function (request, reply) {
    try {
        const userByGoogle = await googleService.login(this, request);
        reply.send({ message: 'Login successful', userByGoogle });
    } catch (error) {
        throw new Error(error.message);
    }  
};

exports.profile = async function (request, reply) {
    if (!request.session.user) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    return reply.send(request.session.user);
};
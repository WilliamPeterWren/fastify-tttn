// middle ware thêm từ file không hoạt động - đã thêm trực tiếp trong server.js
async function middleware (request, reply) {
  try {
    await request.jwtVerify();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error('Unauthorized server 00');
    const token = authHeader.split(' ')[1];
    request.user = await fastify.jwt.decode(token);
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized server 01' });
  }
}
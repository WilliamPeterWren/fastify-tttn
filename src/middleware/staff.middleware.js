const isStaff = async(request, reply) =>  {
  const user = request.user;
  if (!user || !user.roles.includes('STAFF')) {
    return reply.status(403).send({ message: 'Forbidden: STAFF only' });
  }
}


module.exports = {
  isStaff
};

const isAdmin = async(request, reply) =>  {
  const user = request.user;
  if (!user || !user.roles.includes('ADMIN')) {
    return reply.status(403).send({ message: 'Forbidden: Admins only' });
  }
}


module.exports = {
  isAdmin
};

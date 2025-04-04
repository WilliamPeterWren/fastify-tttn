const reviewController = require('./review.controller');

const schema = require('./schema/index')

async function reviewRoutes(fastify, options) {

  fastify.post('/create', { 
    preHandler: [fastify.authenticate],  
    schema: schema.createReview
  }, reviewController.createReview(fastify));

}

module.exports = reviewRoutes;

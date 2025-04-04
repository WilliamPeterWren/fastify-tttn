const categoryController = require('./category.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');
const schema = require('./schema/index');

async function categoryRoutes(fastify, options) {

    fastify.post('/create', { 
        preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
        schema: schema.create
    }, categoryController.createCategory(fastify));

    fastify.put('/update/:slug', { 
        preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
        schema: schema.update
    }, categoryController.updateCategory(fastify));

    fastify.delete('/delete/:slug', { 
        preHandler: [fastify.authenticate, adminMiddleware.isAdmin],  
        schema: schema.remove
    }, categoryController.deleteCategory(fastify));

    fastify.get('/get-all', { 
        schema: schema.getAll
    }, categoryController.getAllCategories)


    fastify.get('/:slug',{
        schema: schema.getOne
    }, categoryController.getCategoryBySlug(fastify));  
}

module.exports = categoryRoutes;

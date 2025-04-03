const categoryController = require('./category.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');
const schema = require('./schema/index');

async function categoryRoutes(fastify, options) {

    fastify.post('/create', { 
        preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
        schema: schema.create
    }, categoryController.createCategory);

    fastify.put('/update/:id', { 
        preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
        schema: schema.update
    }, categoryController.updateCategory);

    fastify.delete('/delete/:id', { 
        preHandler: [fastify.authenticate, adminMiddleware.isAdmin],  
    }, categoryController.deleteCategory);

    fastify.get('/get-all', { 
        schema: schema.getAll
    }, categoryController.getAllCategories)


    fastify.get('/:id',{
        schema: schema.getOne
    }, categoryController.getCategoryById);  
}

module.exports = categoryRoutes;

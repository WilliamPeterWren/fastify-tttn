const categoryService = require('./category.service');

exports.createCategory = async (request, reply) => {
    try {
        const { category_name } = request.body;
        if (!category_name) {
            return reply.code(400).send({ message: 'Category name is required' });  
        }

        const category = await categoryService.createCategory(category_name);
        reply.send({ message: 'Category created successfully', category });
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
};

exports.getAllCategories = async (request, reply) => {
    try {
        const { page = 1, limit = 10 } = request.query;

        const categories = await categoryService.getAllCategories(page, limit);
        console.log(categories);

        reply.code(200).send(categories);
    } catch (err) {
        console.log(err.message);
        reply.code(500).send({ error: err.message });
    }
};


exports.updateCategory = async (request, reply) => {
    try {
        const { id } = request.params;
        const { category_name, parent } = request.body;

        if(!category_name) {
            return reply.code(400).send({ message: 'Category name is required' });  
        }

        const category = await categoryService.updateCategory(id, category_name, parent);

        if (!category) {
            return reply.code(404).send({ message: 'Category not found' });
        }
        console.log(category);

        reply.send(category);
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
};

exports.deleteCategory = async (request, reply) => {
    try {
        const { id } = request.params;
        const deletedCategory = await categoryService.deleteCategory(id);

        if (!deletedCategory) {
            return reply.code(404).send({ message: 'Category not found' });
        }

        reply.send({ message: 'Category deleted successfully' });
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
};

exports.getCategoryById = async (request, reply) => {
    try {
        const { id } = request.params;
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return reply.code(404).send({ message: 'Category not found' });  
        }
        await reply.send(category);
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
};

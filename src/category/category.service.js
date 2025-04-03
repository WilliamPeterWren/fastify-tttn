const Category = require('../models/Category');

exports.createCategory = async (category_name) => {
    const existingCategory = await Category.findOne({ category_name })
    if (existingCategory) {
        throw new Error('Category already exists');
    }

    const category = new Category({ category_name });
    return await category.save();
};

exports.getAllCategories = async (page = 1, limit = 10) => {
    const categories = await Category.find()
        .populate({ path: 'parent', select: 'category_name' })
        .skip((page - 1) * limit)  
        .limit(limit)
        .lean();

    const totalCategories = await Category.countDocuments();

    const formattedCategories = categories.map(category => ({
        _id: category._id,
        category_name: category.category_name,
        parent: category.parent ? category.parent.category_name : null 
    }));

    console.log(formattedCategories);

    return { categories: formattedCategories, total: totalCategories, page, limit };
};


exports.updateCategory = async (id, category_name, parent) => {
    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory && existingCategory._id.toString() !== id) {
        throw new Error('Category name already in use');
    }

    return await Category.findByIdAndUpdate(id, { category_name, parent }, { new: true });
};

exports.deleteCategory = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error('Category not found');
    }
    return await Category.findByIdAndDelete(id);
};

exports.getCategoryById = async (id) => {
    const category = await Category.findById(id)
        .populate({ path: 'parent', select: 'category_name' })
        .lean();

    if (!category) {
        throw new Error('Category not found');
    }

    return {
        _id: category._id,
        category_name: category.category_name,
        parent: category.parent ? category.parent.category_name : null
    };
};



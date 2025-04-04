const Category = require('../models/Category');

const {createSlug} = require('../utils/user.utils'); 

exports.createCategory = async (category_name, parent) => {
    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory) {
        throw new Error('Category already exists'); 
    }   

    const category = new Category({ 
        category_name,
        parent,
        slug: createSlug(category_name) 
    });
    return await category.save();
};

exports.getAllCategories = async (page = 1, limit = 10) => {
    const categories = await Category.find()
        .populate({ path: 'parent', select: 'category_name' })
        .skip((page - 1) * limit)  
        .limit(limit)
        .lean();

    const formattedCategories = categories.map(category => ({
        _id: category._id,
        category_name: category.category_name,
        parent: category.parent ? category.parent.category_name : null 
    }));

    return formattedCategories;
};

exports.updateCategory = async (slug, category_name, parent) => {
    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid category slug');
    }

    const category = await Category.findOne({ slug });
    if (!category) {
        throw new Error('Category not found');
    }

    const updatedCategory = await Category.findOneAndUpdate(
        { slug },
        { 
            category_name: category_name || category.category_name, 
            parent: parent !== undefined ? parent : category.parent, 
            slug: category_name ? createSlug(category_name) : slug 
        }, 
        { new: true, runValidators: true }
    ).select('-__v -created_at -products');

    if (!updatedCategory) {
        throw new Error('Failed to update category');
    }

    return updatedCategory;
};

exports.deleteCategory = async (slug) => {
    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid category slug');
    }

    const deletedCategory = await Category.findOneAndDelete({ slug });
    if (!deletedCategory) {
        throw new Error('Category not found');
    }

    return deletedCategory;
};

exports.getCategoryBySlug = async (slug) => {

    const category = await Category.findOne({slug})
        .populate({ path: 'parent', select: 'category_name' })
        .lean();

    console.log(category)

    if (!category) {
        throw new Error('Category not found');
    }

    return category;
};



const Brand = require('../models/Brand');
const { createSlug } = require('../utils/user.utils');

exports.getAllBrands = async (page, limit) => {
    const brands = await Brand.find()
        .select('-__v -products -created_at')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return brands;
};

exports.getByBrandSlug = async (slug) => {
    const brand = await Brand.findOne({ slug })
        .select('-__v -created_at')
        .lean();

    if (!brand) {
        throw new Error('Brand not found');
    }

    return brand;
};

exports.create = async (data) => {
    const brand = await Brand.findOne({ brand_name: data.brand_name });
    if (brand) {
        throw new Error('Brand with this name already exists');
    }

    const newItem = new Brand({ ...data, slug: createSlug(data.brand_name) });
    return await newItem.save();
};

exports.update = async (slug, data) => {
    const existingBrand = await Brand.findOne({ slug });
    if (!existingBrand) {
        throw new Error('Brand not found'); // Fixed logic: check for non-existence
    }

    const updatedBrand = await Brand.findOneAndUpdate(
        { slug },
        { ...data, slug: createSlug(data.brand_name) },
        { new: true, runValidators: true }
    ).select('-__v -created_at -products');

    if (!updatedBrand) {
        throw new Error('Failed to update brand');
    }

    return updatedBrand;
};

exports.remove = async (slug) => {
    const deletedBrand = await Brand.findOneAndDelete({ slug });
    if (!deletedBrand) {
        throw new Error('Brand not found');
    }
    return deletedBrand;
};
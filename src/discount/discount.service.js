const Discount = require('../models/Discount');
const { createSlug } = require('../utils/user.utils');

exports.getAllDiscounts = async (page, limit) => {
    const discounts = await Discount.find()
        .select('-__v')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return discounts;
};

exports.getByDiscountSlug = async (slug) => {
    const discount = await Discount.findOne({ slug })
        .select('-__v')
        .lean();

    if (!discount) {
        throw new Error('Discount not found');
    }

    return discount;
};

exports.create = async (data) => {
    const discount = await Discount.findOne({ name: data.name });
    if (discount) {
        throw new Error('Discount with this name already exists');
    }

    const newItem = new Discount({ ...data, slug: createSlug(data.name) });
    return await newItem.save();
};

exports.update = async (slug, data) => {
    const existingDiscount = await Discount.findOne({ slug });
    if (!existingDiscount) {
        throw new Error('Discount not found');
    }

    const updatedDiscount = await Discount.findOneAndUpdate(
        { slug },
        { ...data, slug: createSlug(data.name) },
        { new: true, runValidators: true }
    ).select('-__v -created_at -products');

    if (!updatedDiscount) {
        throw new Error('Failed to update discount');
    }

    return updatedDiscount;
};

exports.remove = async (slug) => {
    const deletedDiscount = await Discount.findOneAndDelete({ slug });
    if (!deletedDiscount) {
        throw new Error('Discount not found');
    }
    return deletedDiscount;
};
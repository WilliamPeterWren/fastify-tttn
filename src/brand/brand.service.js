const Brand = require('../models/Brand');

exports.getAllBrands = async (fastify) => {
  try {
    const brands = await Brand.find().select('-__v -products -created_at');
    return brands; 
  } catch (error) {
    throw fastify.httpErrors.badRequest('Could not fetch brands');
  }
};

exports.getByBrandId = async (id, fastify) => {
  try {
    console.log("id: " + id);
    const brand = await Brand.findById(id);
    console.log(brand);
    return brand;
  } catch (error) {
    throw fastify.httpErrors.badRequest('brand id not found');
  }

};

exports.create = async (data, fastify) => {
  try {
    const newItem = new Brand(data);
    return await newItem.save();
  } catch (error) {
    throw fastify.httpErrors.badRequest('Could not create');
  }
};

exports.update = async (id, data, fastify) => {
    try {
      const brand = await Brand.findByIdAndUpdate(id, data, { new: true }).select("-__v -created_at -products");
      return brand;
    } catch (error) {
      throw fastify.httpErrors.badRequest('Could not update');
    }
};

exports.remove = async (id) => {
    try {
        return await Brand.findByIdAndDelete(id);
    } catch (error) {
        throw fastify.httpErrors.badRequest('Could not delete');
    }
};

const Address = require('../models/Address');
const User = require('../models/User');

const getAll = async () => {
    return await Address.find();
};

const getByUserId = async (userId, fastify) => {
  const user = await User.findOne({_id: userId, is_active: true}).select('-password');
  if(!user){
    return fastify.httpErrors.notFound('User not found or deactivated');
  }
  return await Address.find({ user: userId });
};

const getByAddressId = async (addressId, fastify) => {
  try {
    return await Address.findById(addressId);
  } catch (error) {
    return fastify.httpErrors.notFound('Address not found');
  }
};

const create = async (data, fastify) => {
  try {
    const { user, street, ward, city, province, phone_number, is_default } = data;

    const userr = await User.findOne({_id: user, is_active: true}).select('-password - __v');

    if (!userr) {
      return fastify.httpErrors.notFound('User not found or deactivated');
    }

    const count = await Address.countDocuments({ user: user });
    
    if(count > 3){
      return fastify.httpErrors.badRequest('User can have maximum 3 addresses');
    }

    const newAddress = new Address({
      user: user,
      street,
      ward,
      city,
      province,
      phone_number,
      is_default: is_default ?? true,
    });

    await newAddress.save();
    return { message: 'Address created successfully', address: newAddress };
  } catch (error) {
      return { message: 'Internal Server Error', error };
  }
};

const update = async (id, data, fastify) => {
  try {
    return await Address.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw fastify.httpErrors.badRequest('Id not found!');
  }
};

const remove = async (id, fastify) => {
  try {
    return await Address.findByIdAndDelete(id);
  } catch (error) {
    throw fastify.httpErrors.badRequest('Id not found!');
  }
};

module.exports = { 
  getAll, 
  getByUserId, 
  getByAddressId,
  create, 
  update, 
  remove 
};
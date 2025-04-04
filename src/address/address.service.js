const Address = require('../models/Address');
const User = require('../models/User');

const getAll = async () => {
    return await Address.find();
};

const getByUserId = async (userId) => {
    const user = await User.findOne({ _id: userId, is_active: true }).select('-password');
    if (!user) {
        throw new Error('User not found or deactivated');
    }
    return await Address.find({ user: userId });
};

const getByAddressId = async (addressId) => {
    const address = await Address.findById(addressId);
    if (!address) {
        throw new Error('Address not found');
    }
    return address;
};

const create = async (data) => {
    const { user, street, ward, city, province, phone_number, is_default } = data;

    const userDoc = await User.findOne({ _id: user, is_active: true }).select('-password -__v');
    if (!userDoc) {
        throw new Error('User not found or deactivated');
    }

    const count = await Address.countDocuments({ user });
    if (count > 3) {
        throw new Error('User can have maximum 3 addresses');
    }

    const newAddress = new Address({
        user,
        street,
        ward,
        city,
        province,
        phone_number,
        is_default: is_default ?? true,
    });

    await newAddress.save();
    return { message: 'Address created successfully', address: newAddress };
};

const update = async (id, data) => {
    
    // TẠO ADDRESS MỚI
    // xóa những address chưa từng mua hàng khi update address

    const address = await Address.findByIdAndUpdate(id, data, { new: true });
    

    if (!address) {
        throw new Error('Address not found');
    }
    return address;
};

const remove = async (id) => {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
        throw new Error('Address not found');
    }
    return { message: 'Address deleted successfully' };
};

module.exports = { 
    getAll, 
    getByUserId, 
    getByAddressId,
    create, 
    update, 
    remove 
};
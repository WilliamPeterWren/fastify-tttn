const Cart = require('../models/Cart');

exports.getAll = async () => {
    return await Cart.find();
};

exports.getOne = async (id) => {
    return await Cart.findById(id);
};

exports.create = async (data) => {
    const newItem = new Cart(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await Cart.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Cart.findByIdAndDelete(id);
};

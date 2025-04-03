const DeliveryDiscount = require('../models/DeliveryDiscount');

exports.getAll = async () => {
    return await DeliveryDiscount.find();
};

exports.getOne = async (id) => {
    return await DeliveryDiscount.findById(id);
};

exports.create = async (data) => {
    const newItem = new DeliveryDiscount(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await DeliveryDiscount.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await DeliveryDiscount.findByIdAndDelete(id);
};

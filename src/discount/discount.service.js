const Discount = require('./Discount');

exports.getAll = async () => {
    return await Discount.find();
};

exports.getOne = async (id) => {
    return await Discount.findById(id);
};

exports.create = async (data) => {
    const newItem = new Discount(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await Discount.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Discount.findByIdAndDelete(id);
};

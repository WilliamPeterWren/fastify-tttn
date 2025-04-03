const Price = require('./Price');

exports.getAll = async () => {
    return await Price.find();
};

exports.getOne = async (id) => {
    return await Price.findById(id);
};

exports.create = async (data) => {
    const newItem = new Price(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await Price.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Price.findByIdAndDelete(id);
};

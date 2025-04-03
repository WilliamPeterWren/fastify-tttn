const Type = require('../models/Type');

exports.getAll = async () => {
    return await Type.find();
};

exports.getOne = async (id) => {
    return await Type.findById(id);
};

exports.create = async (data) => {
    const newItem = new Type(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await Type.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Type.findByIdAndDelete(id);
};

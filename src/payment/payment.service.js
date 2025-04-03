const Payment = require('./Payment');

exports.getAll = async () => {
    return await Payment.find();
};

exports.getOne = async (id) => {
    return await Payment.findById(id);
};

exports.create = async (data) => {
    const newItem = new Payment(data);
    return await newItem.save();
};

exports.update = async (id, data) => {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Payment.findByIdAndDelete(id);
};

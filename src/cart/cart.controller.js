const Cart = require('./Cart');

exports.getAll = async (req, res) => {
    try {
        const items = await Cart.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Cart not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = new Cart(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Cart not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const deletedItem = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Cart not found' });
        res.json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

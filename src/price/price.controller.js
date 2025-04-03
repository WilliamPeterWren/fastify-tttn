const PriceService = require('./priceService');

exports.getAll = async (req, res) => {
    try {
        const items = await PriceService.getAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const item = await PriceService.getOne(req.params.id);
        if (!item) return res.status(404).json({ message: 'Price not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = await PriceService.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedItem = await PriceService.update(req.params.id, req.body);
        if (!updatedItem) return res.status(404).json({ message: 'Price not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const deletedItem = await PriceService.remove(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Price not found' });
        res.json({ message: 'Price deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

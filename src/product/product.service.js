const Product = require('../models/Product');
const Price = require('../models/Price');

exports.create = async (data, fastify) => {
    const existingProduct = await Product.findOne({ product_name: data.product_name });
    if (existingProduct) {
        throw fastify.httpErrors.badRequest('Product with this name already exists');
    }

    console.log("yes 000")

    const product = new Product(data);
    await product.save();
    console.log("yes 001")

    let newPrice = null;
    if (data.latest_price) {
        newPrice = await Price.create({ product: product._id, price: data.latest_price });
    }
    const productObj = product.toObject();
    productObj.latest_price = newPrice?._id;
    
    return productObj;
};

exports.getAllProducts = async (page = 1, limit = 10) => {
    const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('brand categories discount latest_price');

    const totalProducts = await Product.countDocuments();

    return { products, total: totalProducts, page, limit };
};

exports.getProductById = async (id) => {
    return await Product.findById(id).populate('brand categories discount latest_price');
};

exports.updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

exports.updateProductPrice = async (productId, newPrice) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    return await product.updatePrice(newPrice);
};

exports.getProductPriceHistory = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    return await product.getPriceHistory();
};
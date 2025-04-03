const Order = require('./Order');
const Product = require('../product/Product');

exports.createOrder = async (userId, orderData) => {
    if (!orderData.order_items || orderData.order_items.length === 0) {
        throw new Error('Order must contain at least one item.');
    }

    const processedItems = [];
    let totalAmount = 0;

    for (const item of orderData.order_items) {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product ${item.product} not found.`);
        if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.product_name}.`);

        const priceAtPurchase = product.latest_price ? product.latest_price.price : 0;
        totalAmount += priceAtPurchase * item.quantity;

        processedItems.push({
            product: product._id,
            type: item.type,
            price_at_purchase: priceAtPurchase,
            quantity: item.quantity,
            discount_at_purchase: item.discount || null
        });

        product.stock -= item.quantity;
        await product.save();
    }

    const order = new Order({
        user: userId,
        payment: orderData.payment,
        order_items: processedItems,
        total_voucher: orderData.total_voucher || 0,
        total_amount: totalAmount - (orderData.total_voucher || 0),
        status: 'Pending',
        estimated_delivery: orderData.estimated_delivery || null,
        shipping_address: orderData.shipping_address
    });

    return await order.save();
};

exports.getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('user payment order_items.product order_items.type');
    if (!order) throw new Error('Order not found.');
    return order;
};

exports.getAllOrders = async (page = 1, limit = 10) => {
    const orders = await Order.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('user payment order_items.product order_items.type');

    const totalOrders = await Order.countDocuments();
    return { orders, total: totalOrders, page, limit };
};

exports.updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found.');

    order.status = status;
    return await order.save();
};

exports.deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};

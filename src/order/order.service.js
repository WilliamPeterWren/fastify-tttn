const mongoose = require('mongoose');

const Order = require('../models/Order');
const { createSlug } = require('../utils/user.utils');

exports.purchase = async (user, data) => {
  const { payment_type, order_items, total_voucher, shipping_address } = data;

  const order = new Order({user, ...data});
  await order.save();

  return await order.save();
};


exports.getAllOrders = async (userId, page = 1, limit = 10) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
    }
    if (!Number.isInteger(page) || page < 1) {
        throw new Error('Page must be a positive integer');
    }
    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error('Limit must be a positive integer');
    }

    const skip = (page - 1) * limit;
    const orders = await Order.find({ user: userId })
        .populate('shipping_address', 'street ward city province phone_number') 
        .sort({ created_at: -1 }) 
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();

    if (!orders.length && page > 1) {
        throw new Error('Page out of range');
    }

    const totalItems = await Order.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalItems / limit);

    console.log(orders)

    return {
        orders, 
        pagination: {
            page,
            limit,
            totalItems,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1
        }
    };
};

exports.getOne = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate('shipping_address', 'street ward city province phone_number')
        .select('-__v -created_at')
        .lean();

    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};


  exports.update = async (orderId, data) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new Error('Invalid orderId');
    }

    const { status } = data;
   
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }   

    const order = await Order.findById(orderId)
        .populate('shipping_address', 'street ward city province phone_number');
    if (!order) {
        throw new Error('Order not found');
    }

    if (status) order.status = status;
  
    await order.save();

    return {
        order: order.toObject(), 
        message: 'Order updated successfully',
        code: 200
    };
};
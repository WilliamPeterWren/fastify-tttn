const standardResponses = require('../../schemas/standard.response');

const responseSchema = {
  type: 'object',
  properties: {
    order: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        user: { type: 'string' },
        payment_type: {
          type: 'string',
          enum: ['momo', 'vnpay', 'paypal', 'bank_transfer', 'cash_on_delivery']
        },
        order_items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              product: { type: 'string' },
              price_at_purchase: { type: 'number' },
              discount_at_purchase: { type: 'string', nullable: true },
              quantity: { type: 'number' }
            }
          }
        },
        total_voucher: { type: 'number' },
        shipping_address: { type: 'string' },
        status: {
          type: 'string',
          enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        },
        estimated_delivery: { type: 'string', format: 'date-time', nullable: true },
        created_at: { type: 'string', format: 'date-time' }
      }
    },
    message: { type: 'string' },
    code: { type: 'number' }
  }
}

const purchase = {
  description: 'Purchase order endpoint',
  tags: ['Order'],
  operationId: 'purchaseOrder',
  body: {
    type: 'object',
    properties: {
      payment_type: {
        type: 'string',
        enum: ['momo', 'vnpay', 'paypal', 'bank_transfer', 'cash_on_delivery']
      },
      order_items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            product: { type: 'string' }, // ProductVariant ID
            price_at_purchase: { type: 'number', minimum: 0 },
            discount_at_purchase: { type: 'string', nullable: true }, // Discount ID
            quantity: { type: 'number', minimum: 1 }
          },
          required: ['product', 'price_at_purchase', 'quantity']
        }
      },
      total_voucher: { type: 'number', minimum: 0, default: 0 },
      shipping_address: { type: 'string' } // Address ID
    },
    required: ['order_items', 'shipping_address']
  },
  response: {
    201: responseSchema,
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    ...standardResponses
  }
};

module.exports = purchase;
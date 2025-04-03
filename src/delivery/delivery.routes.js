const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/DeliveryDiscountController');

router.get('/api/deliverydiscount', getAll);
router.get('/api/deliverydiscount/:id', getOne);
router.post('/api/deliverydiscount', create);
router.put('/api/deliverydiscount/:id', update);
router.delete('/api/deliverydiscount/:id', remove);

module.exports = router;

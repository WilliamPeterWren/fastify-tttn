const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('./controllers/PaymentController');

router.get('/api/payment', getAll);
router.get('/api/payment/:id', getOne);
router.post('/api/payment', create);
router.put('/api/payment/:id', update);
router.delete('/api/payment/:id', remove);

module.exports = router;

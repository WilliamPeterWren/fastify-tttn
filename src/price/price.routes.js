const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('./priceController');

router.get('/api/price', getAll);
router.get('/api/price/:id', getOne);
router.post('/api/price', create);
router.put('/api/price/:id', update);
router.delete('/api/price/:id', remove);

module.exports = router;

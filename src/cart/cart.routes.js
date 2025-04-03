const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('./controllers/CartController');

router.get('/api/cart', getAll);
router.get('/api/cart/:id', getOne);
router.post('/api/cart', create);
router.put('/api/cart/:id', update);
router.delete('/api/cart/:id', remove);

module.exports = router;

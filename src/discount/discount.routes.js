const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('./controllers/DiscountController');

router.get('/api/discount', getAll);
router.get('/api/discount/:id', getOne);
router.post('/api/discount', create);
router.put('/api/discount/:id', update);
router.delete('/api/discount/:id', remove);

module.exports = router;

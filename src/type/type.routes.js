const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('./controllers/TypeController');

router.get('/api/type', getAll);
router.get('/api/type/:id', getOne);
router.post('/api/type', create);
router.put('/api/type/:id', update);
router.delete('/api/type/:id', remove);

module.exports = router;

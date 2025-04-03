const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: '120' } 
});

module.exports = mongoose.model('Token', tokenSchema);

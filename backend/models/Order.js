const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_id: { type: String, required: true }, // Razorpay order id is a string
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', orderSchema)
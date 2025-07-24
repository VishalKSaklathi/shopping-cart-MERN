const mongoose = require('mongoose');
const { collection } = require('./User');

const cartSchema = mongoose.Schema({
    productID: { type: Number, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    thumbnail: { type: String, required: true }
}, { collection: 'cart_data' })

module.exports = mongoose.model('Cart', cartSchema)
const express = require('express');
const { addToOrder, verifyPayment, clearCart } = require('../controller/razorPaymentsController');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

//  Create order
router.post('/create-order', addToOrder);

// Verify payment
router.post('/verify-payment', verifyPayment);

// Clear user's cart
router.post('/clear-cart', clearCart);

module.exports = router;

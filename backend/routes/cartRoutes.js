const db = require('../db');
const { addToCart, getCart, updateCart, deleteProduct } = require('../controller/cartController');
const express = require('express');
const router = express.Router();

router.post('/', addToCart); // add to cart
router.get('/:userID', getCart); // get cart items for a specific user
router.put('/:productID', updateCart); // Update quantity
router.delete('/:productID', deleteProduct); // Remove item from cart

module.exports = router;

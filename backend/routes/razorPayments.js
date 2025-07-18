const express = require('express');
const Razorpay = require('razorpay');
const db = require('../db');
const dotenv = require('dotenv');
dotenv.config();

const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils.js');

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt, notes } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt,
            notes,
        };

        const order = await razorpay.orders.create(options);

        // Save to TiDB
        const insertQuery = `
    INSERT INTO orders (order_id, amount, currency, status)
    VALUES (?, ?, ?, ?)
    `;
        await db.query(insertQuery, [order.id, order.amount, order.currency, 'created']);

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
});

// ✅ Verify payment
router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const secret = razorpay.key_secret;

    try {
        const isValid = validateWebhookSignature(body, razorpay_signature, secret);

        if (isValid) {
            // Update order status in DB
            const updateQuery = `
        UPDATE orders
        SET status = ?, payment_id = ?
        WHERE order_id = ?
    `;
            await db.query(updateQuery, ['paid', razorpay_payment_id, razorpay_order_id]);

            console.log('✅ Payment verified and order updated');
            res.status(200).json({ status: 'ok' });
        } else {
            console.warn('❌ Invalid payment signature');
            res.status(400).json({ status: 'verification_failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
});

// ✅ Clear user's cart
router.post('/clear-cart', (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const sql = 'DELETE FROM cart_table WHERE userID = ?';
    db.query(sql, [userID], (err, result) => {
        if (err) {
            console.error('SQL Delete Error:', err);
            return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Cart cleared successfully', result });
    });
});

module.exports = router;

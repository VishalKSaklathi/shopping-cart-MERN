const express = require('express');
const Razorpay = require('razorpay');
const fs = require('fs');
const db = require('../db');
const dotenv = require('dotenv');
dotenv.config();

//module for verification
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils.js');
const router = express.Router();

// Replace with your Razorpay credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to read data from JSON file
const getOrdersFromDB = async () => {
    const [rows] = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
    return rows;
};

// Function to write data to JSON file
const saveOrderToDB = async (orderData) => {
    const query = `INSERT INTO orders (order_id, amount, currency, status) VALUES (?, ?, ?, ?)`;
    const values = [orderData.id, orderData.amount, orderData.currency, orderData.status];
    await db.execute(query, values);
};

// Initialize orders.json if it doesn't exist
const initializeOrdersTable = async () => {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM orders');
    if (rows[0].count === 0) {
        console.log("Initializing empty order list...");
        // Insert a dummy order or just leave it empty depending on your logic
        // await db.query('INSERT INTO orders (...) VALUES (...)');
    }
};

await initializeOrdersTable();

//Let us now integrate the orders API.

// Route to handle order creation
router.post('/create-order', async (req, res) => {
    console.log("Order is creating")
    try {
        const { amount, currency, receipt, notes } = req.body;

        const options = {
            amount: amount * 100,
            currency,
            receipt,
            notes
        };

        const order = await razorpay.orders.create(options);

        // Read current orders, add new order, and write back to the file
        const orders = await getOrdersFromDB();
        orders.push({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: 'created',
        });
        await saveOrderToDB(order);

        res.json(order); // Send order details to frontend, including order ID
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});

// Route to handle payment verification
router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = razorpay.key_secret;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    try {
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if (isValidSignature) {
            // Update the order with payment details
            const orders = await getOrdersFromDB();
            const order = orders.find(o => o.order_id === razorpay_order_id);
            if (order) {
                order.status = 'paid';
                order.payment_id = razorpay_payment_id;
                await saveOrderToDB(order);
            }
            res.status(200).json({ status: 'ok' });
            console.log("Payment verification successful");
        } else {
            res.status(400).json({ status: 'verification_failed' });
            console.log("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
})

router.post('/clear-cart', (req, res) => {
    const userID = req.body.userID;
    const sql = 'DELETE FROM cart_table WHERE userID=?';

    if (!userID) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    db.query(sql, [userID], (err, result) => {
        if (err) {
            console.error(" SQL Delete Error:", err);
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Cart cleared successfully', result });
    });
});


///et us add a route to redirect users to the payment success page.

// Route to serve the success page
// router.get('/payment-success', (req, res) => {
//     res.sendFile(path.join(__dirname, 'success.html'));
// });
// callback_url: 'http://localhost:3000/payment-success'

module.exports = router;

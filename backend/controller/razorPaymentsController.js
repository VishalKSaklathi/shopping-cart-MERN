const Order = require('../models/Order');
const Razorpay = require('razorpay'); // Assuming you have a separate file for Razorpay instance


// Add to order
exports.addToOrder = async (req, res) => {
    console.log("Adding to order");
    try {
        // Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const { amount, currency, receipt, notes } = req.body;
        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt,
            notes,
        };
        const razorpayOrder = await razorpay.orders.create(options);

        await new Order({ order_id: razorpayOrder.id, amount, currency, status: razorpayOrder.status }).save();
        res.status(201).json(razorpayOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
}



const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils.js');
// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const isValid = validateWebhookSignature(
            `${razorpay_order_id}|${razorpay_payment_id}`,
            razorpay_signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if (isValid) {
            // Update order status in DB
            const order = await Order.findOneAndUpdate(
                { order_id: razorpay_order_id },
                { status: 'paid' },
                { new: true }
            );
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            console.log('Payment verified and order updated');
            res.status(200).json({ status: 'ok' });
        } else {
            console.warn('Invalid payment signature');
            res.status(400).json({ status: 'verification_failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
};
// clear cart 
exports.clearCart = async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await Cart.deleteMany({ userID });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
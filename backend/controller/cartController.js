const Cart = require('../models/Cart');

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { productID, title, price, quantity, thumbnail } = req.body;
        const userID = req.user ? req.user._id : req.body.userID; // support both auth middleware or direct userID
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // Check if product already in cart for this user
        let cartItem = await Cart.findOne({ productID, userID });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Cart updated', cartItem });
        } else {
            cartItem = new Cart({ productID, userID, title, price, quantity, thumbnail });
            await cartItem.save();
            return res.status(201).json({ message: 'Added to cart', cartItem });
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all cart items for a user
exports.getCart = async (req, res) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const cartItems = await Cart.find({ userID });
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Get cart error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update quantity of a product in cart 
exports.updateCart = async (req, res) => {
    try {
        const { productID } = req.params;
        const { quantity, userID } = req.body;
        if (!userID || !productID) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }
        const cartItem = await Cart.findOne({ productID, userID });
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        return res.status(200).json({ message: 'Cart updated', cartItem });
    } catch (error) {
        console.error('Update cart error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product from cart
exports.deleteProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const { userID } = req.body;
        if (!userID || !productID) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }
        const deleted = await Cart.findOneAndDelete({ productID, userID });
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error('Delete product error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

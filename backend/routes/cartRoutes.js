const db = require('../db');
const express = require('express');
const router = express.Router();

// add to cart
router.post('/', (req, res) => {
    const { productID, userID, title, price, quantity, thumbnail } = req.body;
    console.log(" Incoming cart item:", req.body);

    const sql = 'INSERT INTO cart_table (productID, userID, title, price, quantity, thumbnail) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [productID, userID, title, price, quantity, thumbnail], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Item added to cart!', result });
    });
});
//get cart items for a specific user
router.get('/:userID', (req, res) => {
    const { userID } = req.params;
    const sql = 'SELECT * FROM cart_table WHERE userID = ?';
    db.query(sql, [userID], (err, result) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            return res.status(500).send(err);
        }
        res.send(result);
    });
});


// Update quantity
router.put('/:productID', (req, res) => {
    const { productID } = req.params;
    const { quantity, userID } = req.body;


    const sql = 'UPDATE cart_table SET quantity = ? WHERE  userID =? AND productID = ? ';
    db.query(sql, [quantity, userID, productID], (err, result) => {
        if (err) {
            console.error(" SQL Update Error:", err);
            return res.status(500).send(err);
        }
        res.send({ message: 'Quantity updated!', result });
    });
});

// Remove item from cart
router.delete('/:productID', (req, res) => {
    const { productID } = req.params;

    const sql = 'DELETE FROM cart_table WHERE productID = ?';
    db.query(sql, [productID], (err, result) => {
        if (err) {
            console.error(" SQL Delete Error:", err);
            return res.status(500).send(err);
        }
        res.send({ message: 'Item removed from cart!', result });
    });
});

module.exports = router;
///okay let's see what to change here
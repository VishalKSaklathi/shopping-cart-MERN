
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.mjs'
import razorPayments from './routes/razorPayments.mjs'
import db from './db.mjs'
// import bodyParser from 'body-parser';
// const { json } = bodyParser;

const app = express();
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["POST", 'GET', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(express.json());

//login / signup hndling
app.use('/api/auth', authRoutes);
app.use('/api/payment', razorPayments);
// add to cart
app.post('/api/cart', (req, res) => {
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
app.get('/api/cart/:userID', (req, res) => {
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
app.put('/api/cart/:productID', (req, res) => {
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
app.delete('/api/cart/:productID', (req, res) => {
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

//i have to create another endpoint to delete all Items related to userID

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello from Vercel backend!');
});

//process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
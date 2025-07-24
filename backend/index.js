const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./db'); // importing mongoDC connection
const authRoutes = require('./routes/authRoutes'); // assuming authRoutes.js
const razorPayments = require('./routes/razorPayments'); // assuming razorPayments.js
const cartRoutes = require('./routes/cartRoutes'); // assuming cartRoutes.js
const dotenv = require('dotenv');
dotenv.config();
// import bodyParser from 'body-parser';
// const { json } = bodyParser;

const app = express();
db();

const allowedOrigin = process.env.CLIENT_URL;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors({
    origin: allowedOrigin,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

//login / signup handling
app.use('/api/auth', authRoutes);
app.use('/api/payment', razorPayments);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from Vercel backend!');
});

// process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
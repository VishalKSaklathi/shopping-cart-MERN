const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./db'); // assuming db.js
const authRoutes = require('./routes/authRoutes'); // assuming authRoutes.js
const razorPayments = require('./routes/razorPayments'); // assuming razorPayments.js
const cartRoutes = require('./routes/cartRoutes'); // assuming cartRoutes.js
// import bodyParser from 'body-parser';
// const { json } = bodyParser;

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://shopping-cart-frontend-kappa.vercel.app"
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser())

//login / signup hndling
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
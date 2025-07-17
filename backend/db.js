require('dotenv').config();
// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true
    }
});

db.connect(err => {
    if (err) {
        console.error(' DB connection error:', err.message);
        return;
    }
    console.log('Connected to MySQL DB');
});

module.exports = db;
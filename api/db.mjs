// backend/db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'vishal',
    database: 'shopping_cart'
});

db.connect(err => {
    if (err) {
        console.error(' DB connection error:', err.message);
        return;
    }
    console.log('Connected to MySQL DB');
});

export default db;

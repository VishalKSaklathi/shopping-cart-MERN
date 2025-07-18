
const db = require('../db');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

//login
router.post('/login', (req, res) => {
    const { email, pass } = req.body;
    const sql = `
    SELECT userID, userPass, userName, userphoneNo, userAddress, userEmail
    FROM users
    WHERE userEmail = ?`;

    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            console.error('DB SELECT ERROR:', err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = results[0];
        if (user.userPass !== pass) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // generate & return a JWT here
        const token = jwt.sign({ userID: user.userID, userName: user.userName, userphoneNo: user.userphoneNo, userAddress: user.userAddress, userEmail: user.userEmail }, 'our-jsonwebtoken-secret-key', { expiresIn: '1d' });
        res.cookie('token', token);
        return res.json({
            user: {
                userID: user.userID,
                userName: user.userName,
                userphoneNo: user.userphoneNo,
                userAddress: user.userAddress,
                userEmail: user.userEmail
            }
        });

    })
})

//signup
router.post('/signup', (req, res) => {
    console.log("Received signup data:", req.body); // ✅ Step 1
    const { name, pass, phone, address, email } = req.body;

    const sql = `
            INSERT INTO users
            (userName, userPass, userphoneNo, userAddress, userEmail)
            VALUES
            (?, ?, ?, ?, ?)
        `;
    const params = [name, pass, phone, address, email];
    db.query(sql, params, (err, data) => {
        if (err) {
            console.error("DB INSERT ERROR:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        console.log("Data put to DB", data);
        // generate & return a JWT here
        // const token = jwt.sign({ userID: data.insertId, userName: name, userphoneNo: phone, userAddress: address, userEmail: email }, 'our-jsonwebtoken-secret-key', { expiresIn: '1d' });
        // res.cookie('token', token);
        return res
            .status(201)
            .json({
                message: "User registered successfully",
                insertId: data.insertId,
                // user: {
                //     userID: data.insertId,
                //     userName: name,
                //     userphoneNo: phone,
                //     userAddress: address,
                //     userEmail: email
                // }
            });
    });
});

//check
router.get('/check', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, 'our-jsonwebtoken-secret-key');
        res.json({ user: decoded });

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

//lougout 
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
})

module.exports = router;
const config = require('dotenv');
config.config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, phone, email, address, pass } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = new User({ name, phone, email, address, password: hashedPassword });
        await user.save();
        console.log("User created:", user);
        return res.status(201).json({ message: 'Registered Successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
        });
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Get User Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}
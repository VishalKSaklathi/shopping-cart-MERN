const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process with failure

    }
}

module.exports = db;
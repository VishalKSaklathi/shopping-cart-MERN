const db = require('../db');
const { signup, login, getUser, logout } = require('../controller/authController');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', login); //login
router.post('/signup', signup); //signup
router.get('/check', getUser); //check
router.post('/logout', logout);//lougout 

module.exports = router;
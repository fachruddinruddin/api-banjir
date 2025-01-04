const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route untuk register
router.post('/register', authController.registerUser);

// Route untuk login
router.post('/login', authController.loginUser);

module.exports = router;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Update path sesuai lokasi file userModel.js

// Fungsi untuk register user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Cek apakah user sudah ada
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Buat user baru
        const newUser = new User({
            username,
            email,
            password, // password akan dihash otomatis di model
        });

        // Simpan user ke database
        await newUser.save();

        // Buat JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt:', { email, password });

        // Cek apakah user ada
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }

        // Cek password menggunakan metode matchPassword yang ada di model
        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Buat JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };

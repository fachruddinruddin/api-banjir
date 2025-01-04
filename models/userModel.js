const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Menggunakan bcrypt, bukan bcryptjs

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Sebelum menyimpan data user, hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    // Hash password menggunakan bcrypt
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Pre-save hashed password:', this.password);
    next();
});

// Membuat method untuk memverifikasi password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Menggunakan bcrypt untuk membandingkan password
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

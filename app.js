const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const floodRoutes = require('./routes/floodRoutes');
const authRoutes = require('./routes/authRoutes'); // Pastikan authRoutes sudah diimpor

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // Increase timeout to 5000ms
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Gunakan routes untuk flood dan auth
app.use('/api', floodRoutes); // Menangani flood route
app.use('/api', authRoutes);  // Menangani auth route (login, register)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

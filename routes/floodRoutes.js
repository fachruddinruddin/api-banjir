const express = require('express');
const router = express.Router();
const floodController = require('../controllers/floodController');
const protect = require('../middleware/authMiddleware');

// Create Flood Report (protected route)
router.post('/flood', protect, floodController.createFloodReport);

// Get All Flood Reports
router.get('/flood', floodController.getAllFloodReports);

// Update Flood Report (protected route)
router.put('/flood/:id', protect, floodController.updateFloodReport);

// Delete Flood Report (protected route)
router.delete('/flood/:id', protect, floodController.deleteFloodReport);

module.exports = router;

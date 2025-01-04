const Flood = require('../models/floodModel');

// Create Flood Report
exports.createFloodReport = async (req, res) => {
    const { location, severity, description, date } = req.body;
    try {
        const lastFlood = await Flood.findOne().sort({ _id: -1 });
        const newId = lastFlood ? lastFlood._id + 1 : 1;
        const flood = new Flood({ _id: newId, location, severity, description, date, user: req.user });
        await flood.save();
        res.status(201).json(flood);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Flood Reports
exports.getAllFloodReports = async (req, res) => {
    try {
        const floods = await Flood.find().select('-__v');  // Exclude the version key
        res.status(200).json(floods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Flood Report
exports.updateFloodReport = async (req, res) => {
    const { id } = req.params;
    const { location, severity, description, date } = req.body;
    try {
        const flood = await Flood.findByIdAndUpdate(
            id,
            { location, severity, description, date },
            { new: true }
        ).select('-__v');  // Exclude the version key
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json(flood);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Flood Report
exports.deleteFloodReport = async (req, res) => {
    const { id } = req.params;
    try {
        const flood = await Flood.findByIdAndDelete(id);
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json({ message: 'Flood report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

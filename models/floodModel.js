const mongoose = require('mongoose');

const floodSchema = new mongoose.Schema({
    _id: { type: Number, required: true },  // Use Number for _id instead of ObjectId
    location: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { versionKey: false });  // Disable the version key

const Flood = mongoose.model('Flood', floodSchema);

module.exports = Flood;

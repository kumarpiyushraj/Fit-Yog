const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  details: { type: String, required: true },
  availableSeats: { type: Number, required: true, default: 100 }, // New field
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;

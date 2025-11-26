const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  seatsBooked: { type: Number, required: true },
  pricePaid: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;

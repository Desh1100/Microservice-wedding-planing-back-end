// models/vendor.js
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  service: {
    type: String,
    enum: ["catering", "photography", "florist", "music", "transport", "other"],
    required: true,
  },
  schedule: [
    {
      date: { type: Date },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
});

module.exports = mongoose.model("Vendor", vendorSchema);

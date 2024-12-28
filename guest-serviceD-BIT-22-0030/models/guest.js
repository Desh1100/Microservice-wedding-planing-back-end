// models/guest.js
const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  invitationSent: { type: Boolean, default: false },
  rsvpResponse: { type: String, enum: ["yes", "no", "maybe"], default: null },
});

module.exports = mongoose.model("Guest", guestSchema);

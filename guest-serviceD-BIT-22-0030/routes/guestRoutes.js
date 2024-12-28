// routes/guestRoutes.js
const express = require("express");
const Guest = require("../models/guest");
const router = express.Router();

// Get all guests
router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get guests", details: err.message });
  }
});
// Add a new guest
router.post("/", async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    await newGuest.save();
    res.status(201).json(newGuest); // Respond with the created guest
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add guest", details: err.message });
  }
});

// Update guest information
router.put("/:id", async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGuest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    res.json(updatedGuest);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update guest", details: err.message });
  }
});

// Delete a guest
router.delete("/:id", async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete guest", details: err.message });
  }
});

// Send an RSVP request (update status and invitationSent flag)
router.post("/:id/rsvp", async (req, res) => {
  const { rsvpResponse } = req.body; // Accepts 'yes', 'no', or 'maybe'
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }

    guest.rsvpResponse = rsvpResponse;
    guest.invitationSent = true; // Mark the invitation as sent
    await guest.save();

    res.json({ message: "RSVP updated", guest });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to send RSVP", details: err.message });
  }
});

// Track RSVP responses (get all guests with RSVP status)
router.get("/rsvp", async (req, res) => {
  try {
    const guests = await Guest.find({ invitationSent: true });
    res.json(guests);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to track RSVP responses", details: err.message });
  }
});

module.exports = router;

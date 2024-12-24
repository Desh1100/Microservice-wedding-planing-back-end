// routes/vendorRoutes.js
const express = require("express");
const Vendor = require("../models/vendor");
const router = express.Router();

// Add a new vendor
router.post("/", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.status(201).json(newVendor); // Respond with the created vendor
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add vendor", details: err.message });
  }
});

// Update vendor schedule
router.put("/:id/schedule", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Update the vendor's schedule
    vendor.schedule.push(req.body);
    await vendor.save();

    res.json({ message: "Vendor schedule updated", vendor });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to update vendor schedule",
        details: err.message,
      });
  }
});

// Get vendor details
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json(vendor);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get vendor details", details: err.message });
  }
});

// Remove a vendor
router.delete("/:id", async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor removed" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove vendor", details: err.message });
  }
});

module.exports = router;

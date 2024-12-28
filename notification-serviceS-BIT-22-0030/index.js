const express = require("express");
const Notification = require("../models/Notification");
const amqp = require("amqplib");

const router = express.Router();

// RabbitMQ connection
let channel;
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("notifications");
    console.log("RabbitMQ connected, Queue created: notifications");
  } catch (err) {
    console.error("RabbitMQ connection error:", err);
  }
}
connectRabbitMQ();

// Route to queue notifications
router.post("/send", async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    // Save the notification in the database
    const notification = new Notification({ userId, message, type });
    await notification.save();

    // Publish the notification to RabbitMQ
    channel.sendToQueue(
      "notifications",
      Buffer.from(JSON.stringify({ userId, message, type }))
    );

    res.json({ message: "Notification queued successfully", notification });
  } catch (err) {
    res.status(500).json({ error: "Failed to queue notification" });
  }
});

module.exports = router;

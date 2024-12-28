const amqp = require("amqplib");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

async function startConsumer() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("notifications");

    console.log("Consumer listening for notifications...");

    channel.consume("notifications", async (message) => {
      if (message !== null) {
        const notification = JSON.parse(message.content.toString());

        console.log("Processing notification:", notification);

        // Example: Sending an email notification
        if (notification.type === "email") {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: "recipient@example.com", // Replace with actual recipient
            subject: "Notification",
            text: notification.message,
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent:", notification.message);
          } catch (err) {
            console.error("Failed to send email:", err);
          }
        }

        // Acknowledge the message
        channel.ack(message);
      }
    });
  } catch (err) {
    console.error("Consumer error:", err);
  }
}

startConsumer();

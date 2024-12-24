const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("DB connection error:", err));

// Routes
app.use("/events", eventRoutes);

// Start server
app.listen(4001, () => console.log("Event Service running on port 4001"));

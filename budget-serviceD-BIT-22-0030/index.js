// server.js (or app.js)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB connection error:", err));

// Use budget routes
app.use("/budgets", budgetRoutes);

// Start server
app.listen(4003, () => console.log("Budget Service running on port 4003"));

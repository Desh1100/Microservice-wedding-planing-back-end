const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/budget", budgetRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Budget service running on port ${PORT}`);
});

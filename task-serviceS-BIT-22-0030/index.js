const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});

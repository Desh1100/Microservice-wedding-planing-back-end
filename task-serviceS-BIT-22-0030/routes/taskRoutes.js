const express = require("express");
const {
  addTask,
  updateTaskStatus,
  deleteTask,
  getTasksByStatus,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", addTask);
router.patch("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);
router.get("/", getTasksByStatus);

module.exports = router;

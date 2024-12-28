const express = require("express");
const {
  setBudget,
  addExpense,
  getSummary,
  getExpenseDetails,
} = require("../controllers/budgetController");

const router = express.Router();

router.post("/set-budget", setBudget);
router.post("/add-expense", addExpense);
router.get("/summary", getSummary);
router.get("/expenses/:budgetId", getExpenseDetails);

module.exports = router;

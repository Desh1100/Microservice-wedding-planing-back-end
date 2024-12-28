// routes/budgetRoutes.js
const express = require("express");
const Budget = require("../models/budget");
const Vendor = require("../models/vendor");
const router = express.Router();

// Set a new budget
router.post("/", async (req, res) => {
  const { totalBudget } = req.body;
  try {
    const newBudget = new Budget({
      totalBudget,
      remainingBudget: totalBudget,
      expenses: [],
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create budget", details: err.message });
  }
});

// Update an expense
router.put("/:budgetId/expenses/:expenseId", async (req, res) => {
  const { amount, description } = req.body;
  try {
    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    const expense = budget.expenses.id(req.params.expenseId);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    expense.amount = amount;
    expense.description = description;
    budget.remainingBudget =
      budget.totalBudget -
      budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    await budget.save();
    res.json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update expense", details: err.message });
  }
});

// Add a new expense
router.post("/:budgetId/expenses", async (req, res) => {
  const { vendorId, amount, description } = req.body;
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    const expense = { vendorId, amount, description };
    budget.expenses.push(expense);
    budget.remainingBudget =
      budget.totalBudget -
      budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    await budget.save();
    res.status(201).json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add expense", details: err.message });
  }
});

// Get a summary of expenses vs. budget
router.get("/:budgetId/summary", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    const summary = {
      totalBudget: budget.totalBudget,
      expenses: budget.expenses,
      remainingBudget: budget.remainingBudget,
      totalSpent: budget.totalBudget - budget.remainingBudget,
    };

    res.json(summary);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get summary", details: err.message });
  }
});

// Get individual expense details
router.get("/:budgetId/expenses", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    res.json(budget.expenses);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get expenses", details: err.message });
  }
});

module.exports = router;

const BudgetModel = require("../models/budgetModel");

// Set a budget
exports.setBudget = async (req, res) => {
  try {
    const { category, budgetAmount } = req.body;
    const budget = await BudgetModel.createBudget(category, budgetAmount);
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update expenses
exports.addExpense = async (req, res) => {
  try {
    const { budgetId, vendorName, amount, description } = req.body;
    const expense = await BudgetModel.addExpense(
      budgetId,
      vendorName,
      amount,
      description
    );
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get summary of expenses vs. budget
exports.getSummary = async (req, res) => {
  try {
    const summary = await BudgetModel.getBudgetSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View individual expense details
exports.getExpenseDetails = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const expenses = await BudgetModel.getExpenseDetails(budgetId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

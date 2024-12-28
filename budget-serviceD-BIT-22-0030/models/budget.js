// models/budget.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const budgetSchema = new mongoose.Schema({
  totalBudget: { type: Number, required: true },
  expenses: [expenseSchema],
  remainingBudget: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Budget", budgetSchema);

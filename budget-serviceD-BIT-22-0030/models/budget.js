const pool = require("../config/dbconfig");

// Budget-related queries
exports.createBudget = async (category, budgetAmount) => {
  const query =
    "INSERT INTO budgets (category, budget_amount) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [category, budgetAmount]);
  return result.rows[0];
};

exports.getBudgetSummary = async () => {
  const query = `
    SELECT b.id, b.category, b.budget_amount, 
      COALESCE(SUM(e.amount), 0) AS total_expenses,
      (b.budget_amount - COALESCE(SUM(e.amount), 0)) AS remaining_budget
    FROM budgets b
    LEFT JOIN expenses e ON b.id = e.budget_id
    GROUP BY b.id
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Expense-related queries
exports.addExpense = async (budgetId, vendorName, amount, description) => {
  const query =
    "INSERT INTO expenses (budget_id, vendor_name, amount, description) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [
    budgetId,
    vendorName,
    amount,
    description,
  ]);
  return result.rows[0];
};

exports.getExpenseDetails = async (budgetId) => {
  const query = "SELECT * FROM expenses WHERE budget_id = $1";
  const result = await pool.query(query, [budgetId]);
  return result.rows;
};

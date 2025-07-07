// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const BudgetController = require("../controller/budget.controller");

// ========== ROUTES ========== //
router.post("/create-budget", BudgetController.createBudget);
router.put("/update-budget/:id", BudgetController.updateBudget);
router.post("/get-budget-details/:id", BudgetController.getBudgetDetails);
router.post("/get-all-budget-details", BudgetController.getAllBudgetDetails);
router.put("/update-budget-status/:id", BudgetController.updateBudgetStatus);
router.put("/delete-budget/:id", BudgetController.deleteBudget);

// ========== EXPORT ========== //
module.exports = router;

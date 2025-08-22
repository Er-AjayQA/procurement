// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const AllowanceController = require("../controller/transfer.controller");

// ========== ROUTES ========== //
router.post("/create-allowance", AllowanceController.createAllowance);
router.put("/update-allowance/:id", AllowanceController.updateAllowance);
router.post(
  "/get-allowance-details/:id",
  AllowanceController.getAllowanceDetails
);
router.post(
  "/get-all-allowance-details",
  AllowanceController.getAllAllowanceDetails
);
router.put(
  "/update-allowance-status/:id",
  AllowanceController.updateAllowanceStatus
);
router.put("/delete-allowance/:id", AllowanceController.deleteAllowance);

// ========== EXPORT ========== //
module.exports = router;

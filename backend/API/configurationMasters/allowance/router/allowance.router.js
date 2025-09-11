// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const AllowanceController = require("../controller/allowance.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-allowance/:selectedEntity",
  EntityAuth.checkEntity,
  AllowanceController.createAllowance
);
router.put(
  "/update-allowance/:selectedEntity/:id",
  EntityAuth.checkEntity,
  AllowanceController.updateAllowance
);
router.post(
  "/get-allowance-details/:id",
  AllowanceController.getAllowanceDetails
);
router.post(
  "/get-all-allowance-details/:selectedEntity",
  EntityAuth.checkEntity,
  AllowanceController.getAllAllowanceDetails
);
router.put(
  "/update-allowance-status/:id",
  AllowanceController.updateAllowanceStatus
);
router.put("/delete-allowance/:id", AllowanceController.deleteAllowance);

// ========== EXPORT ========== //
module.exports = router;

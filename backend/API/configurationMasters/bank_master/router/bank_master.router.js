// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const BankController = require("../controller/bank_master.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-bank/:selectedEntity",
  EntityAuth.checkEntity,
  BankController.createBank
);
router.put(
  "/update-bank/:selectedEntity/:id",
  EntityAuth.checkEntity,
  BankController.updateBank
);
router.post("/get-bank-details/:id", BankController.getBankDetails);
router.post(
  "/get-all-bank-details/:selectedEntity",
  EntityAuth.checkEntity,
  BankController.getAllBankDetails
);
router.put("/update-bank-status/:id", BankController.updateBankStatus);
router.put("/delete-bank/:id", BankController.deleteBank);

// ========== EXPORT ========== //
module.exports = router;

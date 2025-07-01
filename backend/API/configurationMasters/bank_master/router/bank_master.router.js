// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const BankController = require("../controller/bank_master.controller");

// ========== ROUTES ========== //
router.post("/create-bank", BankController.createBank);
router.put("/update-bank/:id", BankController.updateBank);
router.post("/get-bank-details/:id", BankController.getBankDetails);
router.post("/get-all-bank-details", BankController.getAllBankDetails);
router.put("/update-bank-status/:id", BankController.updateBankStatus);
router.put("/delete-bank/:id", BankController.deleteBank);

// ========== EXPORT ========== //
module.exports = router;

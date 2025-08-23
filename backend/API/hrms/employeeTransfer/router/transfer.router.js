// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferController = require("../controller/transfer.controller");

// ========== ROUTES ========== //
router.post("/create-transfer", TransferController.createTransfer);
router.put("/update-transfer/:id", TransferController.updateTransfer);
router.post("/get-transfer-details/:id", TransferController.getTransferDetails);
router.post(
  "/get-all-transfer-details",
  TransferController.getAllTransferDetails
);
router.put("/delete-transfer/:id", TransferController.deleteTransfer);

// ========== EXPORT ========== //
module.exports = router;

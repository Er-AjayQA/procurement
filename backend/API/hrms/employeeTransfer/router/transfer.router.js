// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferController = require("../controller/transfer.controller");

// ========== ROUTES ========== //
router.post("/create-transfer", TransferController.createTransfer);
router.put("/update-transfer/:id", TransferController.updateTransfer);
router.post("/get-transfer-details/:id", TransferController.getTransferDetails);
router.post(
  "/get-all-transfer-details/:id",
  TransferController.getAllTransferDetails
);
router.post(
  "/get-all-transfer-pending-user-details/:id",
  TransferController.getAllTransferPendingByUserDetails
);
router.put("/delete-transfer/:id", TransferController.deleteTransfer);
router.post(
  "/approval-for-transfer/:id",
  TransferController.approvalForTransfer
);

// ========== EXPORT ========== //
module.exports = router;

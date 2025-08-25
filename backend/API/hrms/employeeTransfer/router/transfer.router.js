// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferController = require("../controller/transfer.controller");

// ========== ROUTES ========== //
router.post("/create-transfer", TransferController.createTransfer);
router.put("/update-transfer/:id", TransferController.updateTransfer);
router.post(
  "/get-transfer-details-by-id/:id",
  TransferController.getTransferDetails
);
router.post(
  "/get-all-transfer-generated-by-user/:id",
  TransferController.getAllTransferDetails
);
router.post(
  "/get-all-transfer-approval-pending-by-user/:id",
  TransferController.getAllTransferPendingByUserDetails
);
router.post(
  "/get-all-transfer-approved-by-user/:id",
  TransferController.getAllTransferApprovedByUser
);
router.post(
  "/get-all-transfer-rejected-by-user/:id",
  TransferController.getAllTransferRejectedByUser
);
router.put("/delete-transfer/:id", TransferController.deleteTransfer);
router.post(
  "/approval-for-transfer/:id",
  TransferController.approvalForTransfer
);

// ========== EXPORT ========== //
module.exports = router;

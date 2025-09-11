// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferController = require("../controller/transfer.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-transfer/:selectedEntity",
  EntityAuth.checkEntity,
  TransferController.createTransfer
);
router.put(
  "/update-transfer/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.updateTransfer
);
router.post(
  "/get-transfer-details-by-id/:id",
  TransferController.getTransferDetails
);
router.post(
  "/get-all-transfer-generated-by-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.getAllTransferDetails
);
router.post(
  "/get-all-transfer-approval-pending-by-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.getAllTransferPendingByUserDetails
);
router.post(
  "/get-all-transfer-approved-by-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.getAllTransferApprovedByUser
);
router.post(
  "/get-all-transfer-rejected-by-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.getAllTransferRejectedByUser
);
router.put("/delete-transfer/:id", TransferController.deleteTransfer);
router.post(
  "/approval-for-transfer/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferController.approvalForTransfer
);

// ========== EXPORT ========== //
module.exports = router;

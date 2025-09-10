// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferReasonController = require("../controller/transferReason_master.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-transferReason/:selectedEntity",
  EntityAuth.checkEntity,
  TransferReasonController.createTransferReason
);
router.put(
  "/update-transferReason/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferReasonController.updateTransferReason
);
router.post(
  "/get-transferReason-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferReasonController.getTransferReasonDetails
);
router.post(
  "/get-all-transferReason-details/:selectedEntity",
  EntityAuth.checkEntity,
  TransferReasonController.getAllTransferReasonDetails
);
router.put(
  "/update-transferReason-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferReasonController.updateTransferReasonStatus
);
router.put(
  "/delete-transferReason/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferReasonController.deleteTransferReason
);

// ========== EXPORT ========== //
module.exports = router;

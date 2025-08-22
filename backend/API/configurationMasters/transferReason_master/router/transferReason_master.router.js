// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferReasonController = require("../controller/transferReason_master.controller");

// ========== ROUTES ========== //
router.post(
  "/create-transferReason",
  TransferReasonController.createTransferReason
);
router.put(
  "/update-transferReason/:id",
  TransferReasonController.updateTransferReason
);
router.post(
  "/get-transferReason-details/:id",
  TransferReasonController.getTransferReasonDetails
);
router.post(
  "/get-all-transferReason-details",
  TransferReasonController.getAllTransferReasonDetails
);
router.put(
  "/update-transferReason-status/:id",
  TransferReasonController.updateTransferReasonStatus
);
router.put(
  "/delete-transferReason/:id",
  TransferReasonController.deleteTransferReason
);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferTypeController = require("../controller/transferType_master.controller");

// ========== ROUTES ========== //
router.post("/create-transferType", TransferTypeController.createTransferType);
router.put(
  "/update-transferType/:id",
  TransferTypeController.updateTransferType
);
router.post(
  "/get-transferType-details/:id",
  TransferTypeController.getTransferTypeDetails
);
router.post(
  "/get-all-transferType-details",
  TransferTypeController.getAllTransferTypeDetails
);
router.put(
  "/update-transferType-status/:id",
  TransferTypeController.updateTransferTypeStatus
);
router.put(
  "/delete-transferType/:id",
  TransferTypeController.deleteTransferType
);

// ========== EXPORT ========== //
module.exports = router;

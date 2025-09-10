// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TransferTypeController = require("../controller/transferType_master.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-transferType/:selectedEntity",
  EntityAuth.checkEntity,
  TransferTypeController.createTransferType
);
router.put(
  "/update-transferType/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferTypeController.updateTransferType
);
router.post(
  "/get-transferType-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferTypeController.getTransferTypeDetails
);
router.post(
  "/get-all-transferType-details/:selectedEntity",
  EntityAuth.checkEntity,
  TransferTypeController.getAllTransferTypeDetails
);
router.put(
  "/update-transferType-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferTypeController.updateTransferTypeStatus
);
router.put(
  "/delete-transferType/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TransferTypeController.deleteTransferType
);

// ========== EXPORT ========== //
module.exports = router;

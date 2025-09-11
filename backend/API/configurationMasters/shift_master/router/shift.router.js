// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ShiftController = require("../controller/shift.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-shift/:selectedEntity",
  EntityAuth.checkEntity,
  ShiftController.createShift
);
router.put(
  "/update-shift/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ShiftController.updateShift
);
router.post("/get-shift-details/:id", ShiftController.getShiftDetails);
router.post(
  "/get-all-shift-details/:selectedEntity",
  EntityAuth.checkEntity,
  ShiftController.getAllShiftDetails
);
router.put("/update-shift-status/:id", ShiftController.updateShiftStatus);
router.put("/delete-shift/:id", ShiftController.deleteShift);

// ========== EXPORT ========== //
module.exports = router;

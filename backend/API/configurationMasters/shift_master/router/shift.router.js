// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ShiftController = require("../controller/shift.controller");

// ========== ROUTES ========== //
router.post("/create-shift", ShiftController.createShift);
router.put("/update-shift/:id", ShiftController.updateShift);
router.post("/get-shift-details/:id", ShiftController.getShiftDetails);
router.post("/get-all-shift-details", ShiftController.getAllShiftDetails);
router.put("/update-shift-status/:id", ShiftController.updateShiftStatus);
router.put("/delete-shift/:id", ShiftController.deleteShift);

// ========== EXPORT ========== //
module.exports = router;

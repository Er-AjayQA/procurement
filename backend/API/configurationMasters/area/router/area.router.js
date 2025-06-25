// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const AreaController = require("../controller/area.controller");

// ========== ROUTES ========== //
router.post("/create-area", AreaController.createArea);
router.put("/update-area/:id", AreaController.updateArea);
router.post("/get-area-details/:id", AreaController.getAreaDetails);
router.post("/get-all-areas", AreaController.getAllAreaDetails);
router.post("/update-area-status/:id", AreaController.updateAreaStatus);
router.put("/delete-area/:id", AreaController.deleteArea);

// ========== EXPORT ========== //
module.exports = router;

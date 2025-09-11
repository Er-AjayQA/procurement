// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const AreaController = require("../controller/area.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-area/:selectedEntity",
  EntityAuth.checkEntity,
  AreaController.createArea
);
router.put(
  "/update-area/:selectedEntity/:id",
  EntityAuth.checkEntity,
  AreaController.updateArea
);
router.post("/get-area-details/:id", AreaController.getAreaDetails);
router.post(
  "/get-all-area-details/:selectedEntity",
  EntityAuth.checkEntity,
  AreaController.getAllAreaDetails
);
router.put("/update-area-status/:id", AreaController.updateAreaStatus);
router.put("/delete-area/:id", AreaController.deleteArea);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const DesignationController = require("../controller/designation.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-designation/:selectedEntity",
  EntityAuth.checkEntity,
  DesignationController.createDesignation
);
router.put(
  "/update-designation/:selectedEntity/:id",
  EntityAuth.checkEntity,
  DesignationController.updateDesignation
);
router.post(
  "/get-designation-details/:id",
  DesignationController.getDesignationDetails
);
router.post(
  "/get-all-designations/:selectedEntity",
  EntityAuth.checkEntity,
  DesignationController.getAllDesignationDetails
);
router.put(
  "/update-designation-status/:id",
  DesignationController.updateDesignationStatus
);
router.put("/delete-designation/:id", DesignationController.deleteDesignation);

// ========== EXPORT ========== //
module.exports = router;

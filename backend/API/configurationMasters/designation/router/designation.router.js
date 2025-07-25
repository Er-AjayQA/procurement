// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const DesignationController = require("../controller/designation.controller");

// ========== ROUTES ========== //
router.post("/create-designation", DesignationController.createDesignation);
router.put("/update-designation/:id", DesignationController.updateDesignation);
router.post(
  "/get-designation-details/:id",
  DesignationController.getDesignationDetails
);
router.post(
  "/get-all-designations",
  DesignationController.getAllDesignationDetails
);
router.put(
  "/update-designation-status/:id",
  DesignationController.updateDesignationStatus
);
router.put("/delete-designation/:id", DesignationController.deleteDesignation);

// ========== EXPORT ========== //
module.exports = router;

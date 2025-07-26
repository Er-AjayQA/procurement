// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const RbacController = require("../controller/rbac.controller");

// ========================= ROUTES ========================= //

// ********* MODULE ROUTES ********* //
router.post("/create-module", RbacController.createModule);
router.put("/update-module/:id", RbacController.updateModule);
router.post("/get-all-module-details", RbacController.getAllModuleDetails);
router.put("/update-module-status/:id", RbacController.updateModuleStatus);
router.put("/delete-module/:id", RbacController.deleteModule);

// ********* SUBMODULES ROUTES ********* //
router.post("/create-submodule", RbacController.createSubModule);
router.put("/update-submodule/:id", RbacController.updateSubModule);
router.post(
  "/get-all-submodule-details",
  RbacController.getAllSubModuleDetails
);
router.put(
  "/update-submodule-status/:id",
  RbacController.updateSubModuleStatus
);
router.put("/delete-submodule/:id", RbacController.deleteSubModule);

// ********* ASSIGN MODULE ROUTES ********* //
router.post("/assign-module", RbacController.assignModule);
router.post(
  "/get-all-assigned-module/:id",
  RbacController.getAllAssignedModuleDetails
);

// ========== EXPORT ROUTES ========== //
module.exports = router;

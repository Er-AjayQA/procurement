// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const RbacController = require("../controller/rbac.controller");
const EntityAuth = require("../../../helper/utilFunctions");

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
router.put(
  "/update-submodule-status/:id",
  RbacController.updateSubModuleStatus
);
router.put("/delete-submodule/:id", RbacController.deleteSubModule);

// ********* ASSIGN MODULE ROUTES ********* //
router.post(
  "/assign-module/:selectedEntity",
  EntityAuth.checkEntity,
  RbacController.assignModule
);
router.post(
  "/get-all-assigned-module/selectedEntity/:id",
  EntityAuth.checkEntity,
  RbacController.getAssignModule
);
router.post(
  "/get-all-users-assigned-module/:selectedEntity",
  EntityAuth.checkEntity,
  RbacController.getAllAssignModule
);
router.post(
  "/check-user-already-assigned/:selectedEntity/:id",
  EntityAuth.checkEntity,
  RbacController.checkIfAlreadyAssign
);
router.post(
  "/revoke-user-permissions/:selectedEntity/:id",
  EntityAuth.checkEntity,
  RbacController.revokePermissions
);
// ========== EXPORT ROUTES ========== //
module.exports = router;

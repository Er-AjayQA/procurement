// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ModuleController = require("../controller/rbac_module_master.controller");
const SubModuleController = require("../controller/rbac_submodule_master.controller");
const AssignModuleController = require("../controller/rbac_assign_module.controller");

// ========== ROUTES ========== //

// Menu Routes
router.post("/create-module", ModuleController.createModule);
router.put("/update-module/:id", ModuleController.updateModule);
router.post("/get-all-module-details", ModuleController.getAllModuleDetails);
router.put("/update-module-status/:id", ModuleController.updateModuleStatus);
router.put("/delete-module/:id", ModuleController.deleteModule);

// SubMenu Routes
router.post("/create-submodule", SubModuleController.createSubModule);
router.put("/update-submodule/:id", SubModuleController.updateSubModule);
router.post(
  "/get-all-submodule-details",
  SubModuleController.getAllSubModuleDetails
);
router.put(
  "/update-submodule-status/:id",
  SubModuleController.updateSubModuleStatus
);
router.put("/delete-submodule/:id", SubModuleController.deleteSubModule);

// Assign Menu Routes
router.post("/assign-module", AssignModuleController.assignModule);
router.post(
  "/get-all-assigned-module/:id",
  AssignModuleController.getAllAssignedModuleDetails
);

// ========== EXPORT ========== //
module.exports = router;

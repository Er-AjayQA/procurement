// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const DepartmentController = require("../controller/department.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-department/:selectedEntity",
  EntityAuth.checkEntity,
  DepartmentController.createDepartment
);
router.put(
  "/update-department/:selectedEntity/:id",
  EntityAuth.checkEntity,
  DepartmentController.updateDepartment
);
router.post(
  "/get-department-details/:id",
  DepartmentController.getDepartmentDetails
);
router.post(
  "/get-all-department-details/:selectedEntity",
  EntityAuth.checkEntity,
  DepartmentController.getAllDepartmentDetails
);
router.put(
  "/update-department-status/:id",
  DepartmentController.updateDepartmentStatus
);
router.put("/delete-department/:id", DepartmentController.deleteDepartment);

// ========== EXPORT ========== //
module.exports = router;

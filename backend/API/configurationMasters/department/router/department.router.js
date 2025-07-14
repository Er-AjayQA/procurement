// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const DepartmentController = require("../controller/department.controller");

// ========== ROUTES ========== //
router.post("/create-department", DepartmentController.createDepartment);
router.put("/update-department/:id", DepartmentController.updateDepartment);
router.post(
  "/get-department-details/:id",
  DepartmentController.getDepartmentDetails
);
router.post(
  "/get-all-department-details",
  DepartmentController.getAllDepartmentDetails
);
router.put(
  "/update-department-status/:id",
  DepartmentController.updateDepartmentStatus
);
router.put("/delete-department/:id", DepartmentController.deleteDepartment);

// ========== EXPORT ========== //
module.exports = router;

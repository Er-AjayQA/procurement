// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const DepartmentController = require("../controller/item_master.controller");

// ========== ROUTES ========== //
router.post("/create-department", DepartmentController.createDepartment);
router.post("/update-department/:id", DepartmentController.updateDepartment);
router.post(
  "/get-department-details/:id",
  DepartmentController.getDepartmentDetails
);
router.post(
  "/get-all-departments",
  DepartmentController.getAllDepartmentDetails
);
router.post(
  "/update-department-status/:id",
  DepartmentController.updateDepartmentStatus
);
router.post("/delete-department/:id", DepartmentController.deleteDepartment);

// ========== EXPORT ========== //
module.exports = router;

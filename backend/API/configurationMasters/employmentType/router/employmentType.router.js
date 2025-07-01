// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EmploymentTypeController = require("../controller/employmentType.controller");

// ========== ROUTES ========== //
router.post(
  "/create-employment-type",
  EmploymentTypeController.createEmploymentType
);
router.post(
  "/update-employment-type/:id",
  EmploymentTypeController.updateEmploymentType
);
router.post(
  "/get-employments-type-details/:id",
  EmploymentTypeController.getEmploymentTypeDetails
);
router.post(
  "/get-all-employment-type-details",
  EmploymentTypeController.getAllEmploymentTypesDetails
);
router.post(
  "/update-employment-type-status/:id",
  EmploymentTypeController.updateEmploymentTypeStatus
);
router.post(
  "/delete-employment-type/:id",
  EmploymentTypeController.deleteEmploymentType
);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EmploymentTypeController = require("../controller/employmentType.controller");

// ========== ROUTES ========== //
router.post(
  "/create-employment-type",
  EmploymentTypeController.createEmploymentType
);
router.put(
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
router.put(
  "/update-employment-type-status/:id",
  EmploymentTypeController.updateEmploymentTypeStatus
);
router.put(
  "/delete-employment-type/:id",
  EmploymentTypeController.deleteEmploymentType
);

// ========== EXPORT ========== //
module.exports = router;

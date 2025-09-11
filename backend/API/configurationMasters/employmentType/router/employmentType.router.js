// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EmploymentTypeController = require("../controller/employmentType.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-employment-type/:selectedEntity",
  EntityAuth.checkEntity,
  EmploymentTypeController.createEmploymentType
);
router.put(
  "/update-employment-type/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EmploymentTypeController.updateEmploymentType
);
router.post(
  "/get-employments-type-details/:id",
  EmploymentTypeController.getEmploymentTypeDetails
);
router.post(
  "/get-all-employment-type-details/:selectedEntity",
  EntityAuth.checkEntity,
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

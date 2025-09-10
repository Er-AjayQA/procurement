// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ServiceCategoryController = require("../controller/service_category.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-service-category/:selectedEntity",
  EntityAuth.checkEntity,
  ServiceCategoryController.createServiceCategory
);
router.put(
  "/update-service-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ServiceCategoryController.updateServiceCategory
);
router.post(
  "/get-service-category-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ServiceCategoryController.getServiceCategoryDetails
);
router.post(
  "/get-all-service-categories/:selectedEntity",
  EntityAuth.checkEntity,
  ServiceCategoryController.getAllServiceCategoryDetails
);
router.put(
  "/update-service-category-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ServiceCategoryController.updateServiceCategoryStatus
);
router.put(
  "/delete-service-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ServiceCategoryController.deleteServiceCategory
);

// ========== EXPORT ========== //
module.exports = router;

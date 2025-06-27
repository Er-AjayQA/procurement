// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ServiceCategoryController = require("../controller/service_category.controller");

// ========== ROUTES ========== //
router.post(
  "/create-service-category",
  ServiceCategoryController.createServiceCategory
);
router.put(
  "/update-service-category/:id",
  ServiceCategoryController.updateServiceCategory
);
router.post(
  "/get-service-category-details/:id",
  ServiceCategoryController.getServiceCategoryDetails
);
router.post(
  "/get-all-service-categories",
  ServiceCategoryController.getAllServiceCategoryDetails
);
router.put(
  "/update-service-category-status/:id",
  ServiceCategoryController.updateServiceCategoryStatus
);
router.post(
  "/delete-service-category/:id",
  ServiceCategoryController.deleteServiceCategory
);

// ========== EXPORT ========== //
module.exports = router;

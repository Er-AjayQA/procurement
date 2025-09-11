// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/service_master.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-service/:selectedEntity",
  EntityAuth.checkEntity,
  ServiceController.createService
);
router.put(
  "/update-service/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ServiceController.updateService
);
router.post("/get-service-details/:id", ServiceController.getServiceDetails);
router.post(
  "/get-all-service-details/:selectedEntity",
  EntityAuth.checkEntity,
  ServiceController.getAllServiceDetails
);
router.put("/update-service-status/:id", ServiceController.updateServiceStatus);
router.put("/delete-service/:id", ServiceController.deleteService);

// ========== EXPORT ========== //
module.exports = router;

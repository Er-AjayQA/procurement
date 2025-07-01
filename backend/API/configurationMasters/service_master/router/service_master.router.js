// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/service_master.controller");

// ========== ROUTES ========== //
router.post("/create-service", ServiceController.createService);
router.put("/update-service/:id", ServiceController.updateService);
router.post("/get-service-details/:id", ServiceController.getServiceDetails);
router.post("/get-all-service-details", ServiceController.getAllServiceDetails);
router.put("/update-service-status/:id", ServiceController.updateServiceStatus);
router.put("/delete-service/:id", ServiceController.deleteService);

// ========== EXPORT ========== //
module.exports = router;

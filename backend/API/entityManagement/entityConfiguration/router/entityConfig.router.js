// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EntityController = require("../controller/entityConfig.controller");

// ========== ROUTES ========== //

// ********************* EVENT MANAGEMENT ROUTES ********************* //
router.post("/create-entity", EntityController.createEntity);
router.put("/update-entity/:id", EntityController.updateEntity);
router.get("/get-entity-details/:id", EntityController.getEntityDetails);
router.post("/get-all-entity-details", EntityController.getAllEntityDetails);
router.put("/update-entity-status/:id", EntityController.updateEntityStatus);
router.put("/delete-entity/:id", EntityController.deleteEntity);

// ========== EXPORT ========== //
module.exports = router;

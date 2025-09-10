// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EventCategoryController = require("../controller/eventCategory.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-event-category/:selectedEntity",
  EntityAuth.checkEntity,
  EventCategoryController.createEventCategory
);
router.put(
  "/update-event-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventCategoryController.updateEventCategory
);
router.post(
  "/get-event-category-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventCategoryController.getEventCategoryDetails
);
router.post(
  "/get-all-event-categories/:selectedEntity",
  EntityAuth.checkEntity,
  EventCategoryController.getAllEventCategoryDetails
);
router.put(
  "/update-event-category-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventCategoryController.updateEventCategoryStatus
);
router.put(
  "/delete-event-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventCategoryController.deleteEventCategory
);

// ========== EXPORT ========== //
module.exports = router;

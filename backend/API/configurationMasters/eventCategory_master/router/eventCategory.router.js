// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EventCategoryController = require("../controller/eventCategory.controller");

// ========== ROUTES ========== //
router.post(
  "/create-event-category",
  EventCategoryController.createEventCategory
);
router.put(
  "/update-event-category/:id",
  EventCategoryController.updateEventCategory
);
router.post(
  "/get-event-category-details/:id",
  EventCategoryController.getEventCategoryDetails
);
router.post(
  "/get-all-event-categories",
  EventCategoryController.getAllEventCategoryDetails
);
router.put(
  "/update-event-category-status/:id",
  EventCategoryController.updateEventCategoryStatus
);
router.put(
  "/delete-event-category/:id",
  EventCategoryController.deleteEventCategory
);

// ========== EXPORT ========== //
module.exports = router;

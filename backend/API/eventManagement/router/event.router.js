// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EventController = require("../controller/event.controller");
const EntityAuth = require("../../../helper/utilFunctions");

// ========== ROUTES ========== //

// ********************* EVENT MANAGEMENT ROUTES ********************* //
router.post(
  "/create-event/:selectedEntity",
  EntityAuth.checkEntity,
  EventController.createEvent
);
router.put(
  "/update-event/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.updateEvent
);
router.get(
  "/get-event-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.getEventDetails
);
router.post(
  "/get-all-events-details/:selectedEntity",
  EntityAuth.checkEntity,
  EventController.getAllEventsDetails
);
router.put(
  "/update-event-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.updateEventStatus
);
router.put(
  "/delete-event/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.deleteEvent
);

// ********************* EVENT TICKET MANAGEMENT ********************* //
router.post(
  "/create-event-tickets/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.createEventTickets
);
router.put(
  "/update-event-tickets/:selectedEntity/:event_id/:id",
  EntityAuth.checkEntity,
  EventController.updateEventTickets
);
router.post(
  "/get-event-ticket-detail/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.getEventTicketsDetails
);
router.post(
  "/get-all-event-tickets/:selectedEntity",
  EntityAuth.checkEntity,
  EventController.getAllEventTicketsDetails
);
router.put(
  "/delete-event-ticket/:selectedEntity/:id",
  EntityAuth.checkEntity,
  EventController.deleteEventTickets
);

// ********************* EVENT REGISTRATION MANAGEMENT ********************* //

// ********************* EVENT REGISTRATION PAYMENT MANAGEMENT ********************* //

// ========== EXPORT ========== //
module.exports = router;

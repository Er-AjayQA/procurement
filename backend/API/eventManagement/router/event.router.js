// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const EventController = require("../controller/event.controller");

// ========== ROUTES ========== //

// ********************* EVENT MANAGEMENT ROUTES ********************* //
router.post("/create-event", EventController.createEvent);
router.put("/update-event/:id", EventController.updateEvent);
router.get("/get-event-details/:id", EventController.getEventDetails);
router.post("/get-all-events-details", EventController.getAllEventsDetails);
router.put("/update-event-status/:id", EventController.updateEventStatus);
router.put("/delete-event/:id", EventController.deleteEvent);

// ********************* EVENT TICKET MANAGEMENT ********************* //
router.post("/create-event-tickets/:id", EventController.createEventTickets);
router.put(
  "/update-event-tickets/:event_id/:id",
  EventController.updateEventTickets
);
router.post(
  "/get-event-ticket-detail/:id",
  EventController.getEventTicketsDetails
);
router.post(
  "/get-all-event-tickets",
  EventController.getAllEventTicketsDetails
);
router.put("/delete-event-ticket/:id", EventController.deleteEventTickets);

// ********************* EVENT REGISTRATION MANAGEMENT ********************* //

// ********************* EVENT REGISTRATION PAYMENT MANAGEMENT ********************* //

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const CalendarController = require("../controller/employeeCalendar");

// ========== ROUTES ========== //
router.post("/create-event", CalendarController.createTicket);
router.put("/update-event/:id", CalendarController.updateTicket);
router.put("/escalate-ticket/:id", CalendarController.escalateTicket);
router.post(
  "/get-ticket-details-by-id/:id",
  CalendarController.getTicketDetails
);
router.post(
  "/get-all-ticket-generated-by-user/:id",
  CalendarController.getAllTicketsGeneratedByUserDetails
);
router.post("/get-all-tickets-details", CalendarController.getAllTicketDetails);
router.post(
  "/get-all-ticket-allocated-to-user/:id",
  CalendarController.getAllTicketAllocatedToUserDetails
);
router.put("/delete-ticket/:id", CalendarController.deleteTicket);
router.post(
  "/approval-for-ticket/:id/:user_id",
  CalendarController.approvalForTicket
);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TicketController = require("../controller/ticket.controller");

// ========== ROUTES ========== //
router.post("/create-ticket", TicketController.createTicket);
router.put("/update-ticket/:id", TicketController.updateTicket);
router.put("/escalate-ticket/:id", TicketController.escalateTicket);
router.post("/get-ticket-details-by-id/:id", TicketController.getTicketDetails);
router.post(
  "/get-all-ticket-generated-by-user/:id",
  TicketController.getAllTicketsGeneratedByUserDetails
);
router.post("/get-all-tickets-details", TicketController.getAllTicketDetails);
router.post(
  "/get-all-ticket-allocated-to-user/:id",
  TicketController.getAllTicketAllocatedToUserDetails
);
router.put("/delete-ticket/:id", TicketController.deleteTicket);
router.post("/approval-for-ticket/:id", TicketController.approvalForTicket);

// ========== EXPORT ========== //
module.exports = router;

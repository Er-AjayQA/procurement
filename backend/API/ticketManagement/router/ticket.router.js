// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TicketController = require("../controller/ticket.controller");
const EntityAuth = require("../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-ticket/:selectedEntity",
  EntityAuth.checkEntity,
  TicketController.createTicket
);
router.put(
  "/update-ticket/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketController.updateTicket
);
router.put(
  "/escalate-ticket/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketController.escalateTicket
);
router.post("/get-ticket-details-by-id/:id", TicketController.getTicketDetails);
router.post(
  "/get-all-ticket-generated-by-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketController.getAllTicketsGeneratedByUserDetails
);
router.post(
  "/get-all-tickets-details/:selectedEntity",
  EntityAuth.checkEntity,
  TicketController.getAllTicketDetails
);
router.post(
  "/get-all-ticket-allocated-to-user/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketController.getAllTicketAllocatedToUserDetails
);
router.put("/delete-ticket/:id", TicketController.deleteTicket);
router.post(
  "/approval-for-ticket/:selectedEntity/:id/:user_id",
  EntityAuth.checkEntity,
  TicketController.approvalForTicket
);

// ========== EXPORT ========== //
module.exports = router;

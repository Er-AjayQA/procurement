// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TicketCategoryController = require("../controller/ticket_category.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-ticket-category/:selectedEntity",
  EntityAuth.checkEntity,
  TicketCategoryController.createTicketCategory
);
router.put(
  "/update-ticket-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketCategoryController.updateTicketCategory
);
router.post(
  "/get-ticket-category-details/:id",
  TicketCategoryController.getTicketCategoryDetails
);
router.post(
  "/get-all-ticket-categories/:selectedEntity",
  EntityAuth.checkEntity,
  TicketCategoryController.getAllTicketCategoryDetails
);
router.put(
  "/update-ticket-category-status/:id",
  TicketCategoryController.updateTicketCategoryStatus
);
router.put(
  "/delete-ticket-category/:id",
  TicketCategoryController.deleteTicketCategory
);

// ========== EXPORT ========== //
module.exports = router;

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
  "/get-ticket-category-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketCategoryController.getTicketCategoryDetails
);
router.post(
  "/get-all-ticket-categories/:selectedEntity",
  EntityAuth.checkEntity,
  TicketCategoryController.getAllTicketCategoryDetails
);
router.put(
  "/update-ticket-category-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketCategoryController.updateTicketCategoryStatus
);
router.put(
  "/delete-ticket-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  TicketCategoryController.deleteTicketCategory
);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TicketCategoryController = require("../controller/ticket_category.controller");

// ========== ROUTES ========== //
router.post(
  "/create-ticket-category",
  TicketCategoryController.createTicketCategory
);
router.put(
  "/update-ticket-category/:id",
  TicketCategoryController.updateTicketCategory
);
router.post(
  "/get-ticket-category-details/:id",
  TicketCategoryController.getTicketCategoryDetails
);
router.post(
  "/get-all-ticket-categories",
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

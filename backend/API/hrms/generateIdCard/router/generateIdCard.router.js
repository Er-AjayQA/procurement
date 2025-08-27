// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const IdCardController = require("../controller/generateIdCard.controller");

// ========== ROUTES ========== //
router.post("/create-employee-id-card", IdCardController.createIdCard);
router.put("/update-employee-id-card/:id", IdCardController.updateIdCard);
router.post(
  "/get-employee-id-card-details/:id",
  IdCardController.getIdCardDetails
);
router.post(
  "/get-all-employee-id-card-details",
  IdCardController.getAllIdCardDetails
);
router.put(
  "/update-employee-id-card-status/:id",
  IdCardController.updateIdCardStatus
);
router.put("/delete-employee-id-card/:id", IdCardController.deleteIdCard);

// ========== EXPORT ========== //
module.exports = router;

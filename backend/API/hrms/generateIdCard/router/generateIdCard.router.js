// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const IdCardController = require("../controller/generateIdCard.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-employee-id-card/:selectedEntity/:id",
  EntityAuth.checkEntity,
  IdCardController.createIdCard
);
router.put("/update-employee-id-card/:id", IdCardController.updateIdCard);
router.post(
  "/get-employee-id-card-details/:id",
  IdCardController.getIdCardDetails
);
router.put(
  "/update-employee-id-card-status/:id",
  IdCardController.updateIdCardStatus
);
router.put("/delete-employee-id-card/:id", IdCardController.deleteIdCard);

// ========== EXPORT ========== //
module.exports = router;

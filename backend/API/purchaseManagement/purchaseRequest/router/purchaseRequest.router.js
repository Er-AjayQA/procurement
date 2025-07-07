// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const PRController = require("../controller/purchaseRequest.controller");

// ========== ROUTES ========== //
router.post("/create-pr", PRController.createPR);
router.put("/update-pr/:id", PRController.updatePR);
router.post("/get-pr-details/:id", PRController.getPRDetails);
router.post("/get-all-pr-details", PRController.getAllPRDetails);
router.put("/update-pr-status/:id", PRController.updatePRStatus);
router.put("/delete-pr/:id", PRController.deletePR);

// ========== EXPORT ========== //
module.exports = router;

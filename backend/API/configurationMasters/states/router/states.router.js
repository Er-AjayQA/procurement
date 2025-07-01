// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const StateController = require("../controller/states.controller");
const multer = require("multer");

// ========== CONFIGURE MULTER ========== //
const upload = multer({ dest: "public/files" });

// ========== ROUTES ========== //
router.post(
  "/upload-states",
  upload.single("excelFile"),
  StateController.uploadState
);
router.post("/get-states-details/:id", StateController.getStateDetails);
router.post("/get-all-states-details", StateController.getAllStateDetails);

// ========== EXPORT ========== //
module.exports = router;

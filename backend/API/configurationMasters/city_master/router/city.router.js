// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const CityController = require("../controller/city.controller");
const multer = require("multer");

// ========== CONFIGURE MULTER ========== //
const upload = multer({ dest: "public/files" });

// ========== ROUTES ========== //
router.post(
  "/upload-cities",
  upload.single("excelFile"),
  CityController.uploadCity
);
router.post("/get-city-details/:id", CityController.getCityDetails);
router.post("/get-all-cities-details", CityController.getAllCityDetails);

// ========== EXPORT ========== //
module.exports = router;

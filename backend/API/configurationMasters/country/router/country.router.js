// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const CountryController = require("../controller/country.controller");
const multer = require("multer");

// ========== CONFIGURE MULTER ========== //
const upload = multer({ dest: "public/files" });

// ========== ROUTES ========== //
router.post(
  "/upload-countries",
  upload.single("excelFile"),
  CountryController.uploadCountry
);
router.post("/get-country-details/:id", CountryController.getCountryDetails);
router.post("/get-all-country-details", CountryController.getAllCountryDetails);

// ========== EXPORT ========== //
module.exports = router;

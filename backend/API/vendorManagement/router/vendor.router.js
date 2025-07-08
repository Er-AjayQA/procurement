// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const VendorController = require("../controller/vendor.controller");

// ========== ROUTES ========== //
router.post("/create-vendor", VendorController.createVendor);
router.put("/update-vendor/:id", VendorController.updateVendor);
router.post("/get-vendor-details/:id", VendorController.getVendorDetails);
router.post("/get-all-vendor-details", VendorController.getAllVendorDetails);
router.put("/update-vendor-status/:id", VendorController.updateVendorStatus);
router.put("/delete-vendor/:id", VendorController.deleteVendor);

// ========== EXPORT ========== //
module.exports = router;

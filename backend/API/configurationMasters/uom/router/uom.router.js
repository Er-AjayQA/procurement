// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const UomController = require("../controller/uom.controller");

// ========== ROUTES ========== //
router.post("/create-uom", UomController.createUom);
router.put("/update-uom/:id", UomController.updateUom);
router.post("/get-uom-details/:id", UomController.getUomDetails);
router.post("/get-all-uom-details", UomController.getAllUomDetails);
router.put("/update-uom-status/:id", UomController.updateUomStatus);
router.put("/delete-uom/:id", UomController.deleteUom);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const UomController = require("../controller/uom.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-uom/:selectedEntity",
  EntityAuth.checkEntity,
  UomController.createUom
);
router.put(
  "/update-uom/:selectedEntity/:id",
  EntityAuth.checkEntity,
  UomController.updateUom
);
router.post("/get-uom-details/:id", UomController.getUomDetails);
router.post(
  "/get-all-uom-details/:selectedEntity",
  EntityAuth.checkEntity,
  UomController.getAllUomDetails
);
router.put("/update-uom-status/:id", UomController.updateUomStatus);
router.put("/delete-uom/:id", UomController.deleteUom);

// ========== EXPORT ========== //
module.exports = router;

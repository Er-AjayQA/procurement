// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ItemController = require("../controller/item_master.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-item/:selectedEntity",
  EntityAuth.checkEntity,
  ItemController.createItem
);
router.put(
  "/update-item/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemController.updateItem
);
router.post(
  "/get-item-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemController.getItemDetails
);
router.post(
  "/get-all-item-details/:selectedEntity",
  EntityAuth.checkEntity,
  ItemController.getAllItemDetails
);
router.put(
  "/update-item-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemController.updateItemStatus
);
router.put(
  "/delete-item/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemController.deleteItem
);

// ========== EXPORT ========== //
module.exports = router;

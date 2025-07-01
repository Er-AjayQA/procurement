// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ItemController = require("../controller/item_master.controller");

// ========== ROUTES ========== //
router.post("/create-item", ItemController.createItem);
router.put("/update-item/:id", ItemController.updateItem);
router.post("/get-item-details/:id", ItemController.getItemDetails);
router.post("/get-all-item-details", ItemController.getAllItemDetails);
router.put("/update-item-status/:id", ItemController.updateItemStatus);
router.put("/delete-item/:id", ItemController.deleteItem);

// ========== EXPORT ========== //
module.exports = router;

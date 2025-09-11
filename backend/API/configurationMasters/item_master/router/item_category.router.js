// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ItemCategoryController = require("../controller/item_category.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-item-category/:selectedEntity",
  EntityAuth.checkEntity,
  ItemCategoryController.createItemCategory
);
router.put(
  "/update-item-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemCategoryController.updateItemCategory
);
router.post(
  "/get-item-category-details/:id",
  ItemCategoryController.getItemCategoryDetails
);
router.post(
  "/get-all-item-categories/:selectedEntity",
  EntityAuth.checkEntity,
  ItemCategoryController.getAllItemCategoryDetails
);
router.put(
  "/update-item-category-status/:id",
  ItemCategoryController.updateItemCategoryStatus
);
router.put(
  "/delete-item-category/:id",
  ItemCategoryController.deleteItemCategory
);

// ========== EXPORT ========== //
module.exports = router;

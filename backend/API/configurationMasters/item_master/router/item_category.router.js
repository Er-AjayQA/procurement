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
  "/get-item-category-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemCategoryController.getItemCategoryDetails
);
router.post(
  "/get-all-item-categories/:selectedEntity",
  EntityAuth.checkEntity,
  ItemCategoryController.getAllItemCategoryDetails
);
router.put(
  "/update-item-category-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemCategoryController.updateItemCategoryStatus
);
router.put(
  "/delete-item-category/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ItemCategoryController.deleteItemCategory
);

// ========== EXPORT ========== //
module.exports = router;

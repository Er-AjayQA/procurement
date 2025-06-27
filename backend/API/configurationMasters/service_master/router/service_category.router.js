// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ItemCategoryController = require("../controller/item_category.controller");

// ========== ROUTES ========== //
router.post("/create-item-category", ItemCategoryController.createItemCategory);
router.put(
  "/update-item-category/:id",
  ItemCategoryController.updateItemCategory
);
router.post(
  "/get-item-category-details/:id",
  ItemCategoryController.getItemCategoryDetails
);
router.post(
  "/get-all-item-categories",
  ItemCategoryController.getAllItemCategoryDetails
);
router.put(
  "/update-item-category-status/:id",
  ItemCategoryController.updateItemCategoryStatus
);
router.post(
  "/delete-item-category/:id",
  ItemCategoryController.deleteItemCategory
);

// ========== EXPORT ========== //
module.exports = router;

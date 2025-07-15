// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const MenuController = require("../controller/rbac_menu_master.controller");
const SubMenuController = require("../controller/rbac_subMenu_master.controller");

// ========== ROUTES ========== //

// Menu Routes
router.post("/create-menu", MenuController.createMenu);
router.put("/update-menu/:id", MenuController.updateMenu);
router.post("/get-all-menu-details", MenuController.getAllMenuDetails);
router.put("/update-menu-status/:id", MenuController.updateMenuStatus);
router.put("/delete-menu/:id", MenuController.deleteMenu);

// SubMenu Routes
router.post("/create-submenu", SubMenuController.createSubMenu);
router.put("/update-submenu/:id", SubMenuController.updateSubMenu);
router.post("/get-all-submenu-details", SubMenuController.getAllSubMenuDetails);
router.put("/update-submenu-status/:id", SubMenuController.updateSubMenuStatus);
router.put("/delete-submenu/:id", SubMenuController.deleteSubMenu);

// ========== EXPORT ========== //
module.exports = router;

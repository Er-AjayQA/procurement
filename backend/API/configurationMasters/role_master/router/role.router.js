// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const RoleController = require("../controller/role.controller");

// ========== ROUTES ========== //
router.post("/create-role", RoleController.createRole);
router.put("/update-role/:id", RoleController.updateRole);
router.post("/get-role-details/:id", RoleController.getRoleDetails);
router.post("/get-all-role-details", RoleController.getAllRoleDetails);
router.put("/update-role-status/:id", RoleController.updateRoleStatus);
router.put("/delete-role/:id", RoleController.deleteRole);

// ========== EXPORT ========== //
module.exports = router;

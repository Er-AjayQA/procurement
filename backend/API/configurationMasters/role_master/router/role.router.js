// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const RoleController = require("../controller/role.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-role/:selectedEntity",
  EntityAuth.checkEntity,
  RoleController.createRole
);
router.put(
  "/update-role/:selectedEntity/:id",
  EntityAuth.checkEntity,
  RoleController.updateRole
);
router.post("/get-role-details/:id", RoleController.getRoleDetails);
router.post(
  "/get-all-role-details/:selectedEntity",
  EntityAuth.checkEntity,
  RoleController.getAllRoleDetails
);
router.put("/update-role-status/:id", RoleController.updateRoleStatus);
router.put("/delete-role/:id", RoleController.deleteRole);

// ========== EXPORT ========== //
module.exports = router;

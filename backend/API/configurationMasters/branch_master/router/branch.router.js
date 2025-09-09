// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const BranchController = require("../controller/branch.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-branch/:selectedEntity",
  EntityAuth.checkEntity,
  BranchController.createBranch
);
router.put(
  "/update-branch/:selectedEntity/:id",
  EntityAuth.checkEntity,
  BranchController.updateBranch
);
router.post(
  "/get-branch-details/:selectedEntity/:id",
  EntityAuth.checkEntity,
  BranchController.getBranchDetails
);
router.post(
  "/get-all-branch-details/:selectedEntity",
  EntityAuth.checkEntity,
  BranchController.getAllBranchDetails
);
router.put(
  "/update-branch-status/:selectedEntity/:id",
  EntityAuth.checkEntity,
  BranchController.updateBranchStatus
);
router.put(
  "/delete-branch/:selectedEntity/:id",
  EntityAuth.checkEntity,
  BranchController.deleteBranch
);

// ========== EXPORT ========== //
module.exports = router;

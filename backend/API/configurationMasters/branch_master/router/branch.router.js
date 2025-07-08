// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const BranchController = require("../controller/branch.controller");

// ========== ROUTES ========== //
router.post("/create-branch", BranchController.createBranch);
router.put("/update-branch/:id", BranchController.updateBranch);
router.post("/get-branch-details/:id", BranchController.getBranchDetails);
router.post("/get-all-branch-details", BranchController.getAllBranchDetails);
router.put("/update-branch-status/:id", BranchController.updateBranchStatus);
router.put("/delete-branch/:id", BranchController.deleteBranch);

// ========== EXPORT ========== //
module.exports = router;

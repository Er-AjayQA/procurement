// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const WorkflowController = require("../controller/workflow.controller");

// ========== ROUTES ========== //
router.post("/create-workflow", WorkflowController.createWorkflow);
router.put("/update-workflow/:id", WorkflowController.updateWorkflow);
router.post("/get-workflow-details/:id", WorkflowController.getWorkflowDetails);
router.post(
  "/get-all-workflow-details",
  WorkflowController.getAllWorkflowDetails
);
router.put(
  "/update-workflow-status/:id",
  WorkflowController.updateWorkflowStatus
);
router.put("/delete-workflow/:id", WorkflowController.deleteWorkflow);

// ========== EXPORT ========== //
module.exports = router;

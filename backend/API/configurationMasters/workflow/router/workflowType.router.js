// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const WorkflowTypeController = require("../controller/workflowType.controller");

// ========== ROUTES ========== //
router.post("/create-workflow-type", WorkflowTypeController.createWorkflowType);
router.put(
  "/update-workflow-type/:id",
  WorkflowTypeController.updateWorkflowType
);
router.post(
  "/get-workflow-type-details/:id",
  WorkflowTypeController.getWorkflowTypeDetails
);
router.post(
  "/get-all-workflow-type",
  WorkflowTypeController.getAllWorkflowTypeDetails
);
router.post(
  "/delete-workflow-type/:id",
  WorkflowTypeController.deleteWorkflowType
);

// ========== EXPORT ========== //
module.exports = router;

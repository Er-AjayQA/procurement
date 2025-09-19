// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const TaskController = require("../controller/task.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
// ********************* TASK MANAGEMENT ROUTES ********************* //
router.post(
  "/create-task/:selectedEntity/:project_id",
  EntityAuth.checkEntity,
  TaskController.createTask
);
router.put(
  "/update-task/:selectedEntity/:project_id/:id",
  EntityAuth.checkEntity,
  TaskController.updateTask
);
router.get("/get-task-details/:id", TaskController.getTaskDetails);
router.post(
  "/get-all-tasks-details/:selectedEntity",
  EntityAuth.checkEntity,
  TaskController.getAllTasksDetails
);
router.put("/update-task-status/:id", TaskController.updateTaskStatus);
router.put("/delete-task/:id", TaskController.deleteTask);

// ********************* SUBTASK MANAGEMENT ROUTES ********************* //
router.post(
  "/create-subtask/:selectedEntity/:task_id",
  EntityAuth.checkEntity,
  TaskController.createSubTask
);
router.put(
  "/update-subtask/:selectedEntity/:task_id/:id",
  EntityAuth.checkEntity,
  TaskController.updateSubTask
);
router.get("/get-subtask-details/:id", TaskController.getSubTaskDetails);
router.post(
  "/get-all-subtasks-details/:selectedEntity",
  EntityAuth.checkEntity,
  TaskController.getAllSubTasksDetails
);
router.put("/update-subtask-status/:id", TaskController.updateSubTaskStatus);
router.put("/delete-subtask/:id", TaskController.deleteSubTask);

// ========== EXPORT ========== //
module.exports = router;

// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ProjectController = require("../controller/project.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //

// ********************* PROJECT MANAGEMENT ROUTES ********************* //
router.post(
  "/create-project/:selectedEntity",
  EntityAuth.checkEntity,
  ProjectController.createProject
);
router.put(
  "/update-project/:selectedEntity/:id",
  EntityAuth.checkEntity,
  ProjectController.updateProject
);
router.get("/get-project-details/:id", ProjectController.getProjectDetails);
router.post(
  "/get-all-projects-details/:selectedEntity",
  EntityAuth.checkEntity,
  ProjectController.getAllProjectsDetails
);
router.put("/update-project-status/:id", ProjectController.updateProjectStatus);
router.put("/delete-project/:id", ProjectController.deleteProject);

// ========== EXPORT ========== //
module.exports = router;

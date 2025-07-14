// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const lmsController = require("../controller/lms_course.controller");

// ========== ROUTES ========== //
router.post("/create-course", lmsController.createCourse);
// router.put("/update-course/:id", lmsController.updateWorkflow);
// router.post("/get-course-details/:id", lmsController.getWorkflowDetails);
// router.post("/get-all-course-details", lmsController.getAllWorkflowDetails);
// router.put("/update-course-status/:id", lmsController.updateWorkflowStatus);
// router.put("/delete-course/:id", lmsController.deleteWorkflow);

// ========== EXPORT ========== //
module.exports = router;

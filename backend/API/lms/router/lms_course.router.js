// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const lmsController = require("../controller/lms_course.controller");

// ========== ROUTES ========== //

// ******************** COURSE BASIC LOGIC ROUTERS ******************** //
router.post("/create-course", lmsController.createCourse);
// router.put("/update-course/:id", lmsController.updateWorkflow);
router.post("/get-course-details/:id", lmsController.getCourseDetails);
router.post("/get-all-course-details", lmsController.getAllCourseDetails);
router.put("/update-course-status/:id", lmsController.updateCourseStatus);

// ******************** COURSE ALLOCATION LOGIC ROUTERS ******************** //
router.post("/assign-course", lmsController.assignCourse);
router.put(
  "/update-assign-course/:assign_id",
  lmsController.updateAssignCourse
);
router.put(
  "/renew-course-validity/:assign_id",
  lmsController.renewAssignedCourseValidity
);
router.post(
  "/get-user-assigned-course-details-by-id/:user_id/:course_id",
  lmsController.getUserAssignedCourseDetailsById
);
router.post(
  "/get-user-all-assigned-course-list/:user_id",
  lmsController.getUserAllAssignedCourseList
);
router.post(
  "/get-all-assigned-course-list",
  lmsController.getAllAssignedCourseList
);
router.post(
  "/get-assigned-course-byId/:assign_id",
  lmsController.getAssignedCourseDetailById
);

// ******************** COURSE ASSESSMENT SUBMISSION LOGIC ROUTERS ******************** //
router.post("/content-submit/:user_id", lmsController.contentSubmit);

router.post(
  "/assessment-submit/:user_id/:assign_id",
  lmsController.assessmentSubmit
);

// ========== EXPORT ========== //
module.exports = router;

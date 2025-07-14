// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const CourseCategoryController = require("../controller/courseCategory.controller");

// ========== ROUTES ========== //
router.post(
  "/create-course_category",
  CourseCategoryController.createCourseCategory
);
router.put(
  "/update-course_category/:id",
  CourseCategoryController.updateCourseCategory
);
router.post(
  "/get-course_category-details/:id",
  CourseCategoryController.getCourseCategoryDetails
);
router.post(
  "/get-all-course_category-details",
  CourseCategoryController.getAllCourseCategoryDetails
);
router.put(
  "/update-course_category-status/:id",
  CourseCategoryController.updateCourseCategoryStatus
);
router.put(
  "/delete-course_category/:id",
  CourseCategoryController.deleteCourseCategory
);

// ========== EXPORT ========== //
module.exports = router;

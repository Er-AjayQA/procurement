import { AttendanceCalendarPage } from "../pages/EmployeeSelfService/attendanceCalendar";
import { EmployeeDetailPage } from "../pages/EmployeeSelfService/employeeDetails";
import { CourseAssessmentReportPage } from "../pages/LearningManagement/CourseAssessmentReport";
import { CoursePage } from "../pages/LearningManagement/coursesPage";

export const moduleComponents = {
  "employee-self-service": {
    "employee-details": EmployeeDetailPage,
    "attendance-calendar": AttendanceCalendarPage,
  },
  "learning-management-system": {
    courses: CoursePage,
    "courses-assessment-report": CourseAssessmentReportPage,
  },
};

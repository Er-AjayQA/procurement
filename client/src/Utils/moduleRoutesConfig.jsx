import { CoursePage } from "../pages/CoursePage";

export const moduleComponents = {
  "employee-self-service": {
    "employee-details": "EmployeeDetailsPage",
    "attendance-calendar": "AttendanceCalendarPage",
  },
  "learning-management-system": {
    courses: CoursePage,
    "courses-assessment-report": "CourseAssessmentReportPage",
  },
};

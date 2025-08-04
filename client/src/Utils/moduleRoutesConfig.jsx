import { AttendanceCalendarPage } from "../pages/EmployeeSelfService/attendanceCalendar";
import { EmployeeDetailPage } from "../pages/EmployeeSelfService/employeeDetails";
import { CourseAssessmentReportPage } from "../pages/LearningManagement/CourseAssessmentReport";
import { CoursePage } from "../pages/LearningManagement/coursesPage";
import { RBACPermissions } from "../pages/RbacManagement/rbacPermissionsPage";
import { RoleMasterPage } from "../pages/RbacManagement/roleMasterPage";

export const moduleComponents = {
  "employee-self-service": {
    "employee-details": EmployeeDetailPage,
    "attendance-calendar": AttendanceCalendarPage,
  },
  "learning-management-system": {
    courses: CoursePage,
    "courses-assessment-report": CourseAssessmentReportPage,
  },
  "rbac-management": {
    "role-master": RoleMasterPage,
    "rbac-permissions": RBACPermissions,
  },
};

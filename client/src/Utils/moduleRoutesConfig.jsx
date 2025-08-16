import { AttendanceCalendarPage } from "../pages/EmployeeSelfService/attendanceCalendar";
import { EmployeeDetailPage } from "../pages/EmployeeSelfService/employeeDetails";
import { MainEmployeePage } from "../pages/Hrms/EmployeeManagement";
import { CourseAssessmentReportPage } from "../pages/LearningManagement/CourseAssessmentReport";
import { CoursesPage } from "../pages/LearningManagement/courses";
import { MasterAllowancePage } from "../pages/Masters/allowanceMaster";
import { MasterAreaPage } from "../pages/Masters/areaMaster";
import { MasterBankPage } from "../pages/Masters/bankMaster";
import { MasterBranchPage } from "../pages/Masters/branchMaster";
import { MasterCityPage } from "../pages/Masters/cityMaster";
import { MasterContractTypePage } from "../pages/Masters/contractTypeMaster";
import { MasterCountryPage } from "../pages/Masters/countryMaster";
import { MasterCourseCategoryPage } from "../pages/Masters/courseCategoryMaster";
import { MasterDepartmentPage } from "../pages/Masters/departmentMaster";
import { MasterDesignationPage } from "../pages/Masters/designationMaster";
import { MasterEmployeeTypePage } from "../pages/Masters/employeeTypeMaster";
import { MasterItemCategoryPage } from "../pages/Masters/itemCategoryMaster";
import { MasterItemPage } from "../pages/Masters/itemMaster";
import { MasterServiceCategoryPage } from "../pages/Masters/serviceCategoryMaster";
import { MasterServicePage } from "../pages/Masters/serviceMaster";
import { MasterShiftPage } from "../pages/Masters/shiftMaster";
import { MasterStatePage } from "../pages/Masters/stateMaster";
import { MasterUomPage } from "../pages/Masters/uomMaster";
import { WorkflowPage } from "../pages/Masters/workflowPage";
import { MasterRolePage } from "../pages/RbacManagement/roleMaster";
import { MasterUserPermissionPage } from "../pages/RbacManagement/userPermission";

export const moduleComponents = {
  hrms: {
    "employee-management": MainEmployeePage,
  },
  "employee-self-service": {
    "employee-details": EmployeeDetailPage,
    "attendance-calendar": AttendanceCalendarPage,
  },
  "learning-management-system": {
    courses: CoursesPage,
    "courses-assessment-report": CourseAssessmentReportPage,
  },
  "rbac-management": {
    "role-master": MasterRolePage,
    "rbac-permissions": MasterUserPermissionPage,
  },
  masters: {
    "designation-master": MasterDesignationPage,
    "department-master": MasterDepartmentPage,
    "country-master": MasterCountryPage,
    "state-master": MasterStatePage,
    "city-master": MasterCityPage,
    "branch-master": MasterBranchPage,
    "area-master": MasterAreaPage,
    "allowance-master": MasterAllowancePage,
    "contract-type-master": MasterContractTypePage,
    "employement-type-master": MasterEmployeeTypePage,
    "shift-master": MasterShiftPage,
    "uom-master": MasterUomPage,
    "item-category-master": MasterItemCategoryPage,
    "item-master": MasterItemPage,
    "service-category-master": MasterServiceCategoryPage,
    "service-master": MasterServicePage,
    "bank-master": MasterBankPage,
    "workflow-master": WorkflowPage,
    "course-category-master": MasterCourseCategoryPage,
  },
};

import { AttendanceCalendarPage } from "../pages/EmployeeSelfService/attendanceCalendar";
import { EmployeeDetailPage } from "../pages/EmployeeSelfService/employeeDetails";
import { CourseAssessmentReportPage } from "../pages/LearningManagement/CourseAssessmentReport";
import { CoursePage } from "../pages/LearningManagement/coursesPage";
import { AllowancePage } from "../pages/Masters/allowancePage";
import { AreaPage } from "../pages/Masters/areaPage";
import { BankPage } from "../pages/Masters/bankPage";
import { BranchPage } from "../pages/Masters/branchPage";
import { CityPage } from "../pages/Masters/cityPage";
import { ContractTypePage } from "../pages/Masters/contractTypePage";
import { CountryPage } from "../pages/Masters/countryPage";
import { DepartmentMasterPage } from "../pages/Masters/departmentMasterPage";
import { DesignationMasterPage } from "../pages/Masters/designationMasterPage";
import { EmploymentTypePage } from "../pages/Masters/employmentTypePage";
import { ItemCategoryPage } from "../pages/Masters/itemCategoryPage";
import { ItemPage } from "../pages/Masters/itemPage";
import { ServiceCategoryPage } from "../pages/Masters/serviceCategoryPage";
import { ServicePage } from "../pages/Masters/servicePage";
import { ShiftPage } from "../pages/Masters/shiftPage";
import { StatePage } from "../pages/Masters/statePage";
import { UOMPage } from "../pages/Masters/uomPage";
import { WorkflowPage } from "../pages/Masters/workflowPage";
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
  masters: {
    "designation-master": DesignationMasterPage,
    "department-master": DepartmentMasterPage,
    "country-master": CountryPage,
    "state-master": StatePage,
    "city-master": CityPage,
    "branch-master": BranchPage,
    "area-master": AreaPage,
    "allowance-master": AllowancePage,
    "contract-type-master": ContractTypePage,
    "employement-type-master": EmploymentTypePage,
    "shift-master": ShiftPage,
    "uom-master": UOMPage,
    "item-category-master": ItemCategoryPage,
    "item-master": ItemPage,
    "service-category-master": ServiceCategoryPage,
    "service-master": ServicePage,
    "bank-master": BankPage,
    "workflow-master": WorkflowPage,
  },
};

import { AttendanceCalendarPage } from "../pages/EmployeeSelfService/attendanceCalendar";
import { EmployeeDetailPage } from "../pages/EmployeeSelfService/employeeDetails";
import { CourseAssessmentReportPage } from "../pages/LearningManagement/CourseAssessmentReport";
import { CoursePage } from "../pages/LearningManagement/coursesPage";
import { AllowancePage } from "../pages/Masters/allowancePage";
import { MasterAreaPage } from "../pages/Masters/areaMaster";
import { MasterBankPage } from "../pages/Masters/bankMaster";
import { BranchMasterPage } from "../pages/Masters/branchMasterPage";
import { CityMasterPage } from "../pages/Masters/cityMasterPage";
import { ContractTypePage } from "../pages/Masters/contractTypePage";
import { CountryMasterPage } from "../pages/Masters/countryMasterPage";
import { DepartmentMasterPage } from "../pages/Masters/departmentMasterPage";
import { DesignationMasterPage } from "../pages/Masters/designationMasterPage";
import { MasterEmployeeTypePage } from "../pages/Masters/employeeTypeMaster";
import { ItemCategoryPage } from "../pages/Masters/itemCategoryPage";
import { ItemPage } from "../pages/Masters/itemPage";
import { ServiceCategoryPage } from "../pages/Masters/serviceCategoryPage";
import { ServicePage } from "../pages/Masters/servicePage";
import { ShiftPage } from "../pages/Masters/shiftPage";
import { StateMasterPage } from "../pages/Masters/stateMasterPage";
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
    "country-master": CountryMasterPage,
    "state-master": StateMasterPage,
    "city-master": CityMasterPage,
    "branch-master": BranchMasterPage,
    "area-master": MasterAreaPage,
    "allowance-master": AllowancePage,
    "contract-type-master": ContractTypePage,
    "employement-type-master": MasterEmployeeTypePage,
    "shift-master": ShiftPage,
    "uom-master": UOMPage,
    "item-category-master": ItemCategoryPage,
    "item-master": ItemPage,
    "service-category-master": ServiceCategoryPage,
    "service-master": ServicePage,
    "bank-master": MasterBankPage,
    "workflow-master": WorkflowPage,
  },
};

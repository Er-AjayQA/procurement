import { EmployeePage } from "../../../components/hrms/employeesManagement/employeePage";
import { EmployeeProvider } from "../../../contextApis/hrms/employeeManagement/employeeProvider";

export const MainEmployeePage = () => {
  return (
    <EmployeeProvider>
      <EmployeePage />
    </EmployeeProvider>
  );
};

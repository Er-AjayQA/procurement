import { EmployeeTypeMasterPage } from "../../../components/masters/employeeTypeMasters/employeeTypeMasterPage";
import { EmployeeTypeMasterProvider } from "../../../contextApis/employeeTypeMaster/employeeTypeMasterProvider";

export const MasterEmployeeTypePage = () => {
  return (
    <EmployeeTypeMasterProvider>
      <EmployeeTypeMasterPage />
    </EmployeeTypeMasterProvider>
  );
};

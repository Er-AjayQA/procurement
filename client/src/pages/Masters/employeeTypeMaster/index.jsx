import { EmployeeTypeMasterPage } from "../../../components/masters/employeeTypeMasters/employeeTypeMasterPage";
import { EmployeeTypeMasterProvider } from "../../../contextApis/masters/employeeTypeMaster/employeeTypeMasterProvider";

export const MasterEmployeeTypePage = () => {
  return (
    <EmployeeTypeMasterProvider>
      <EmployeeTypeMasterPage />
    </EmployeeTypeMasterProvider>
  );
};

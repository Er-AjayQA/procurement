import { BankMasterPage } from "../../../components/masters/bankMasters/bankMasterPage";
import { EmployeeTypeMasterProvider } from "../../../contextApis/employeeTypeMaster/employeeTypeMasterProvider";

export const MasterEmployeeTypePage = () => {
  return (
    <EmployeeTypeMasterProvider>
      <BankMasterPage />
    </EmployeeTypeMasterProvider>
  );
};

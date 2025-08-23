import { EmployeeTransferPage } from "../../../components/hrms/employeeTransfer/employeeTransferPage";
import { EmployeeTransferProvider } from "../../../contextApis/hrms/employeeTransfer/employeeTransferProvider";

export const MainEmployeeTransferPage = () => {
  return (
    <EmployeeTransferProvider>
      <EmployeeTransferPage />
    </EmployeeTransferProvider>
  );
};

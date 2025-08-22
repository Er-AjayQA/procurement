import { EmployeeTransferPage } from "../../../components/hrms/employeeTransfer/transferPage";
import { EmployeeTransferProvider } from "../../../contextApis/hrms/employeeTransfer/transferProvider";

export const MainEmployeeTransferPage = () => {
  return (
    <EmployeeTransferProvider>
      <EmployeeTransferPage />
    </EmployeeTransferProvider>
  );
};

import { EmployeeIdCardPage } from "../../../components/hrms/idCardManagement/idCardPage";
import { EmployeeIdCardProvider } from "../../../contextApis/hrms/idCardManagement/idCardProvider";

export const MainEmployeeIdCardPage = () => {
  return (
    <EmployeeIdCardProvider>
      <EmployeeIdCardPage />
    </EmployeeIdCardProvider>
  );
};

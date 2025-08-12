import { DepartmentMasterPage } from "../../../components/masters/departmentMasters/departmentMasterPage";
import { DepartmentMasterProvider } from "../../../contextApis/departmentMaster/departmentMasterProvider";

export const MasterDepartmentPage = () => {
  return (
    <DepartmentMasterProvider>
      <DepartmentMasterPage />
    </DepartmentMasterProvider>
  );
};

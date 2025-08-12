import { DepartmentMasterPage } from "../../../components/masters/departmentMasters/departmentMasterPage";
import { DepartmentMasterProvider } from "../../../contextApis/masters/departmentMaster/departmentMasterProvider";

export const MasterDepartmentPage = () => {
  return (
    <DepartmentMasterProvider>
      <DepartmentMasterPage />
    </DepartmentMasterProvider>
  );
};

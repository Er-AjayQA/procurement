import { DesignationMasterPage } from "../../../components/masters/designationMasters/designationMasterPage";
import { DesignationMasterProvider } from "../../../contextApis/masters/designationMaster/designationMasterProvider";

export const MasterDesignationPage = () => {
  return (
    <DesignationMasterProvider>
      <DesignationMasterPage />
    </DesignationMasterProvider>
  );
};

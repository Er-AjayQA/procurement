import { DesignationMasterPage } from "../../../components/masters/designationMasters/designationMasterPage";
import { DesignationMasterProvider } from "../../../contextApis/designationMaster/designationMasterProvider";

export const MasterDesignationPage = () => {
  return (
    <DesignationMasterProvider>
      <DesignationMasterPage />
    </DesignationMasterProvider>
  );
};

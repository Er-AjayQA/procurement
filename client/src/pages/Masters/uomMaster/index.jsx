import { UomMasterPage } from "../../../components/masters/uomMasters/uomMasterPage";
import { UomMasterProvider } from "../../../contextApis/masters/uomMaster/uomMasterProvider";

export const MasterUomPage = () => {
  return (
    <UomMasterProvider>
      <UomMasterPage />
    </UomMasterProvider>
  );
};

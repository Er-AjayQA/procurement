import { UomMasterPage } from "../../../components/masters/uomMasters/uomMasterPage";
import { UomMasterProvider } from "../../../contextApis/uomMaster/uomMasterProvider";

export const MasterUomPage = () => {
  return (
    <UomMasterProvider>
      <UomMasterPage />
    </UomMasterProvider>
  );
};

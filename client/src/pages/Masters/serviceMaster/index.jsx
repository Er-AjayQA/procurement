import { ServiceMasterPage } from "../../../components/masters/serviceMasters/serviceMasterPage";
import { ServiceMasterProvider } from "../../../contextApis/serviceMaster/serviceMasterProvider";

export const MasterServicePage = () => {
  return (
    <ServiceMasterProvider>
      <ServiceMasterPage />
    </ServiceMasterProvider>
  );
};

import { ServiceCategoryMasterPage } from "../../../components/masters/serviceCategoryMasters/serviceCategoryMasterPage";
import { ServiceCategoryMasterProvider } from "../../../contextApis/masters/serviceCategoryMaster/serviceCategoryMasterProvider";

export const MasterServiceCategoryPage = () => {
  return (
    <ServiceCategoryMasterProvider>
      <ServiceCategoryMasterPage />
    </ServiceCategoryMasterProvider>
  );
};

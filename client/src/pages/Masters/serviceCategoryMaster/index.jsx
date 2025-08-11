import { ServiceCategoryMasterPage } from "../../../components/masters/serviceCategoryMasters/serviceCategoryMasterPage";
import { ServiceCategoryMasterProvider } from "../../../contextApis/serviceCategoryMaster/serviceCategoryMasterProvider";

export const MasterServiceCategoryPage = () => {
  return (
    <ServiceCategoryMasterProvider>
      <ServiceCategoryMasterPage />
    </ServiceCategoryMasterProvider>
  );
};

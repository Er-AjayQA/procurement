import { ItemCategoryMasterPage } from "../../../components/masters/itemCategoryMasters/itemCategoryMasterPage";
import { ItemCategoryMasterProvider } from "../../../contextApis/masters/itemCategoryMaster/itemCategoryMasterProvider";

export const MasterItemCategoryPage = () => {
  return (
    <ItemCategoryMasterProvider>
      <ItemCategoryMasterPage />
    </ItemCategoryMasterProvider>
  );
};

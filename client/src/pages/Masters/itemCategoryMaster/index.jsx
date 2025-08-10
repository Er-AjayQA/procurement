import { ItemCategoryMasterPage } from "../../../components/masters/itemCategoryMasters/itemCategoryMasterPage";
import { ItemCategoryMasterProvider } from "../../../contextApis/itemCategoryMaster/itemCategoryMasterProvider";

export const MasterItemCategoryPage = () => {
  return (
    <ItemCategoryMasterProvider>
      <ItemCategoryMasterPage />
    </ItemCategoryMasterProvider>
  );
};

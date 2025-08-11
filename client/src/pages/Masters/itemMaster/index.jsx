import { ItemMasterPage } from "../../../components/masters/itemMasters/itemMasterPage";
import { ItemMasterProvider } from "../../../contextApis/itemMaster/itemMasterProvider";

export const MasterItemPage = () => {
  return (
    <ItemMasterProvider>
      <ItemMasterPage />
    </ItemMasterProvider>
  );
};

import { AreaMasterPage } from "../../../components/masters/areaMasters/areaMasterPage";
import { AreaMasterProvider } from "../../../contextApis/masters/areaMaster/areaMasterProvider";

export const MasterAreaPage = () => {
  return (
    <AreaMasterProvider>
      <AreaMasterPage />
    </AreaMasterProvider>
  );
};

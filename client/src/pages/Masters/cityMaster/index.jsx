import { CityMasterPage } from "../../../components/masters/cityMasters/cityMasterPage";
import { CityMasterProvider } from "../../../contextApis/masters/cityMaster/cityMasterProvider";

export const MasterCityPage = () => {
  return (
    <CityMasterProvider>
      <CityMasterPage />
    </CityMasterProvider>
  );
};

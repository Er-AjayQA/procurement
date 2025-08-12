import { CountryMasterPage } from "../../../components/masters/countryMasters/countryMasterPage";
import { CountryMasterProvider } from "../../../contextApis/masters/countryMaster/countryMasterProvider";

export const MasterCountryPage = () => {
  return (
    <CountryMasterProvider>
      <CountryMasterPage />
    </CountryMasterProvider>
  );
};

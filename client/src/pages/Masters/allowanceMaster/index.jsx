import { AllowanceMasterPage } from "../../../components/masters/allowanceMasters/allowanceMasterPage";
import { AllowanceMasterProvider } from "../../../contextApis/allowanceMaster/allowanceMasterProvider";

export const MasterAllowancePage = () => {
  return (
    <AllowanceMasterProvider>
      <AllowanceMasterPage />
    </AllowanceMasterProvider>
  );
};

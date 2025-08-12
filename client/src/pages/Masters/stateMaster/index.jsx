import { StateMasterPage } from "../../../components/masters/stateMasters/stateMasterPage";
import { StateMasterProvider } from "../../../contextApis/stateMaster/StateMasterProvider";

export const MasterStatePage = () => {
  return (
    <StateMasterProvider>
      <StateMasterPage />
    </StateMasterProvider>
  );
};

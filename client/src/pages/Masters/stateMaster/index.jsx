import { StateMasterPage } from "../../../components/masters/stateMasters/stateMasterPage";
import { StateMasterProvider } from "../../../contextApis/masters/stateMaster/StateMasterProvider";

export const MasterStatePage = () => {
  return (
    <StateMasterProvider>
      <StateMasterPage />
    </StateMasterProvider>
  );
};

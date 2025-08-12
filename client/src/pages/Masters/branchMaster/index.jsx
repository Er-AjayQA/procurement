import { BranchMasterPage } from "../../../components/masters/branchMasters/branchMasterPage";
import { BranchMasterProvider } from "../../../contextApis/masters/branchMaster/branchMasterProvider";

export const MasterBranchPage = () => {
  return (
    <BranchMasterProvider>
      <BranchMasterPage />
    </BranchMasterProvider>
  );
};

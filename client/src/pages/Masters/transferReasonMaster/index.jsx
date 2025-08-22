import { TransferReasonMasterPage } from "../../../components/masters/transferReasonMasters/transferReasonMasterPage";
import { TransferReasonMasterProvider } from "../../../contextApis/masters/transferReasonMaster/transferReasonMasterProvider";

export const MasterTransferReasonPage = () => {
  return (
    <TransferReasonMasterProvider>
      <TransferReasonMasterPage />
    </TransferReasonMasterProvider>
  );
};

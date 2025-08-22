import { TransferTypeMasterPage } from "../../../components/masters/transferTypeMasters/transferTypeMasterPage";
import { TransferTypeMasterProvider } from "../../../contextApis/masters/transferTypeMaster/transferTypeMasterProvider";

export const MasterTransferTypePage = () => {
  return (
    <TransferTypeMasterProvider>
      <TransferTypeMasterPage />
    </TransferTypeMasterProvider>
  );
};

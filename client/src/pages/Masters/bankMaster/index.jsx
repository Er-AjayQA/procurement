import { BankMasterPage } from "../../../components/masters/bankMasters/bankMasterPage";
import { BankMasterProvider } from "../../../contextApis/masters/bankMaster/bankMasterProvider";

export const MasterBankPage = () => {
  return (
    <BankMasterProvider>
      <BankMasterPage />
    </BankMasterProvider>
  );
};

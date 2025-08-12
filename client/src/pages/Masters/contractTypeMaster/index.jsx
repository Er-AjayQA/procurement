import { ContractTypeMasterPage } from "../../../components/masters/contractTypeMasters/contractTypeMasterPage";
import { ContractTypeMasterProvider } from "../../../contextApis/masters/contractTypeMaster/contractTypeMasterProvider";

export const MasterContractTypePage = () => {
  return (
    <ContractTypeMasterProvider>
      <ContractTypeMasterPage />
    </ContractTypeMasterProvider>
  );
};

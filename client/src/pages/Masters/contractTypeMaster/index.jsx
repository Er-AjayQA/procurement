import { ContractTypeMasterPage } from "../../../components/masters/contractTypeMasters/contractTypeMasterPage";
import { ContractTypeMasterProvider } from "../../../contextApis/contractTypeMaster/contractTypeMasterProvider";

export const MasterContractTypePage = () => {
  return (
    <ContractTypeMasterProvider>
      <ContractTypeMasterPage />
    </ContractTypeMasterProvider>
  );
};

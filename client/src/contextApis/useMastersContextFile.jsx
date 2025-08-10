import { useContext } from "react";
import { AreaMasterContext } from "./areaMaster/areaMasterContext";
import { BankMasterContext } from "./bankMaster/bankMasterContext";
import { EmployeeTypeMasterContext } from "./employeeTypeMaster/employeeTypeMasterContext";
import { AllowanceMasterContext } from "./allowanceMaster/allowanceMasterContext";
import { ContractTypeMasterContext } from "./contractTypeMaster/contractTypeMasterContext";
import { ShiftMasterContext } from "./shiftMaster/shiftMasterContext";

// Use Area Master Context
export const useAreaMasterContext = () => {
  const context = useContext(AreaMasterContext);
  if (context === undefined) {
    throw new Error("useAreaMaster must be used within a AreaMasterProvider");
  }
  return context;
};

// Use Bank Master Context
export const useBankMasterContext = () => {
  const context = useContext(BankMasterContext);
  if (context === undefined) {
    throw new Error("useBankMaster must be used within a BankMasterProvider");
  }
  return context;
};

// Use Employee Type Master Context
export const useEmployeeTypeMasterContext = () => {
  const context = useContext(EmployeeTypeMasterContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeTypeMasterContext must be used within a EmployeeTypeMasterProvider"
    );
  }
  return context;
};

// Use Allowance Master Context
export const useAllowanceMasterContext = () => {
  const context = useContext(AllowanceMasterContext);
  if (context === undefined) {
    throw new Error(
      "useAllowanceMasterContext must be used within a AllowanceMasterProvider"
    );
  }
  return context;
};

// Use Contract Type Master Context
export const useContractTypeMasterContext = () => {
  const context = useContext(ContractTypeMasterContext);
  if (context === undefined) {
    throw new Error(
      "useContractTypeMasterContext must be used within a ContractTypeMasterProvider"
    );
  }
  return context;
};

// Use Shift Master Context
export const useShiftMasterContext = () => {
  const context = useContext(ShiftMasterContext);
  if (context === undefined) {
    throw new Error(
      "useShiftMasterContext must be used within a ShiftMasterProvider"
    );
  }
  return context;
};

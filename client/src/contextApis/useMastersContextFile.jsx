import { useContext } from "react";
import { AreaMasterContext } from "./areaMaster/areaMasterContext";
import { BankMasterContext } from "./bankMaster/bankMasterContext";
import { EmployeeTypeMasterContext } from "./employeeTypeMaster/employeeTypeMasterContext";

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

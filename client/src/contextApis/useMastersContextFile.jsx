import { useContext } from "react";
import { AreaMasterContext } from "./areaMaster/areaMasterContext";
import { BankMasterContext } from "./bankMaster/bankMasterContext";
import { EmployeeTypeMasterContext } from "./employeeTypeMaster/employeeTypeMasterContext";
import { AllowanceMasterContext } from "./allowanceMaster/allowanceMasterContext";
import { ContractTypeMasterContext } from "./contractTypeMaster/contractTypeMasterContext";
import { ShiftMasterContext } from "./shiftMaster/shiftMasterContext";
import { UomMasterContext } from "./uomMaster/uomMasterContext";
import { ItemCategoryMasterContext } from "./itemCategoryMaster/itemCategoryMasterContext";
import { ServiceCategoryMasterContext } from "./serviceCategoryMaster/serviceCategoryMasterContext";
import { ItemMasterContext } from "./itemMaster/itemMasterContext";
import { ServiceMasterContext } from "./serviceMaster/serviceMasterContext";
import { DesignationMasterContext } from "./designationMaster/designationMasterContext";
import { DepartmentMasterContext } from "./departmentMaster/departmentMasterContext";
import { CountryMasterContext } from "./countryMaster/countryMasterContext";
import { StateMasterContext } from "./stateMaster/stateMasterContext";
import { BranchMasterContext } from "./branchMaster/branchMasterContext";
import { CityMasterContext } from "./cityMaster/cityMasterContext";

// Use Designation Master Context
export const useDesignationMasterContext = () => {
  const context = useContext(DesignationMasterContext);
  if (context === undefined) {
    throw new Error(
      "useDesignationMasterContext must be used within a DesignationMasterProvider"
    );
  }
  return context;
};

// Use Department Master Context
export const useDepartmentMasterContext = () => {
  const context = useContext(DepartmentMasterContext);
  if (context === undefined) {
    throw new Error(
      "useDepartmentMasterContext must be used within a DepartmentMasterProvider"
    );
  }
  return context;
};

// Use Country Master Context
export const useCountryMasterContext = () => {
  const context = useContext(CountryMasterContext);
  if (context === undefined) {
    throw new Error(
      "useCountryMasterContext must be used within a CountryMasterProvider"
    );
  }
  return context;
};

// Use State Master Context
export const useStateMasterContext = () => {
  const context = useContext(StateMasterContext);
  if (context === undefined) {
    throw new Error(
      "useStateMasterContext must be used within a StateMasterProvider"
    );
  }
  return context;
};

// Use City Master Context
export const useCityMasterContext = () => {
  const context = useContext(CityMasterContext);
  if (context === undefined) {
    throw new Error(
      "useCityMasterContext must be used within a CityMasterProvider"
    );
  }
  return context;
};

// Use Branch Master Context
export const useBranchMasterContext = () => {
  const context = useContext(BranchMasterContext);
  if (context === undefined) {
    throw new Error(
      "useBranchMasterContext must be used within a BranchMasterProvider"
    );
  }
  return context;
};

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

// Use Uom Master Context
export const useUomMasterContext = () => {
  const context = useContext(UomMasterContext);
  if (context === undefined) {
    throw new Error(
      "useUomMasterContext must be used within a UomMasterProvider"
    );
  }
  return context;
};

// Use Item Category Master Context
export const useItemCategoryMasterContext = () => {
  const context = useContext(ItemCategoryMasterContext);
  if (context === undefined) {
    throw new Error(
      "useItemCategoryMasterContext must be used within a ItemCategoryMasterProvider"
    );
  }
  return context;
};

// Use Item Master Context
export const useItemMasterContext = () => {
  const context = useContext(ItemMasterContext);
  if (context === undefined) {
    throw new Error(
      "useItemMasterContext must be used within a ItemMasterProvider"
    );
  }
  return context;
};

// Use Service Category Master Context
export const useServiceCategoryMasterContext = () => {
  const context = useContext(ServiceCategoryMasterContext);
  if (context === undefined) {
    throw new Error(
      "useServiceCategoryMasterContext must be used within a ServiceCategoryMasterProvider"
    );
  }
  return context;
};

// Use Service Master Context
export const useServiceMasterContext = () => {
  const context = useContext(ServiceMasterContext);
  if (context === undefined) {
    throw new Error(
      "useServiceMasterContext must be used within a ServiceMasterProvider"
    );
  }
  return context;
};

import { useContext } from "react";
import { EmployeeContext } from "./hrms/employeeManagement/employeeContext";
import { EmployeeTransferContext } from "./hrms/employeeTransfer/employeeTransferContext";
import { EmployeeIdCardContext } from "./hrms/idCardManagement/idCardContext";

// Use Employee Context
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeProvider"
    );
  }
  return context;
};

// Use Employee Transfer Context
export const useEmployeeTransferContext = () => {
  const context = useContext(EmployeeTransferContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeTransferContext must be used within a EmployeeTransferProvider"
    );
  }
  return context;
};

// Use Employee Id Card Context
export const useEmployeeIdCardContext = () => {
  const context = useContext(EmployeeIdCardContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeIdCardContext must be used within a EmployeeIdCardProvider"
    );
  }
  return context;
};

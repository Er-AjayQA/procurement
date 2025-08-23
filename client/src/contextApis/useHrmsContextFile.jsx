import { useContext } from "react";
import { EmployeeContext } from "./hrms/employeeManagement/employeeContext";
import { EmployeeTransferContext } from "./hrms/employeeTransfer/employeeTransferContext";

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

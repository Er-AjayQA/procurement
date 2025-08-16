import { useContext } from "react";
import { EmployeeContext } from "./hrms/employeeManagement/employeeContext";

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

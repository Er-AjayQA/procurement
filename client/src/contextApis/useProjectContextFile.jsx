import { useContext } from "react";
import { ProjectContext } from "./projectManagement/projects/projectContext";

// Use Project Config Context
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

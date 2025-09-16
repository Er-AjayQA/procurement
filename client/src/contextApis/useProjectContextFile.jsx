import { useContext } from "react";
import { ProjectConfigurationsContext } from "./projectManagement/projectsConfigurations/projectConfigurationsContext";

// Use Project Config Context
export const useProjectConfigurationsContext = () => {
  const context = useContext(ProjectConfigurationsContext);
  if (context === undefined) {
    throw new Error(
      "useProjectConfigurationsContext must be used within a ProjectConfigurationsProvider"
    );
  }
  return context;
};

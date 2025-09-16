import { ProjectConfigurationsPage } from "../../../components/projectManagement/projectConfigurations/projectConfigurationsPage";
import { ProjectConfigurationsProvider } from "../../../contextApis/projectManagement/projectsConfigurations/projectConfigurationsProvider";

export const MainProjectConfigurationsPage = () => {
  return (
    <ProjectConfigurationsProvider>
      <ProjectConfigurationsPage />
    </ProjectConfigurationsProvider>
  );
};

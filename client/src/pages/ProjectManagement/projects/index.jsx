import { ProjectsConfigurationPage } from "../../../components/projectManagement/project/registeredEventsPage";
import { ProjectProvider } from "../../../contextApis/projectManagement/projects/projectProvider";

export const MainProjectPage = () => {
  return (
    <ProjectProvider>
      <ProjectsConfigurationPage />
    </ProjectProvider>
  );
};

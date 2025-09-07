import { EntityConfigPage } from "../../../components/entityManagement/entityConfiguration/entityConfigPage";
import { EntityConfigProvider } from "../../../contextApis/entityManagement/entityConfiguration/entityConfigProvider";

export const MainEntityConfigPage = () => {
  return (
    <EntityConfigProvider>
      <EntityConfigPage />
    </EntityConfigProvider>
  );
};

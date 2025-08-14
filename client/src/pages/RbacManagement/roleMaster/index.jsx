import { RoleMasterPage } from "../../../components/rbac/roleMaster/roleMasterPage";
import { RoleMasterProvider } from "../../../contextApis/rbac/roleMaster/roleMasterProvider";

export const MasterRolePage = () => {
  return (
    <RoleMasterProvider>
      <RoleMasterPage />
    </RoleMasterProvider>
  );
};

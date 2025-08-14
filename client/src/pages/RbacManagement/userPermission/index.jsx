import { UserPermissionPage } from "../../../components/rbac/userPermissions/userPermissionPage";
import { UserPermissionProvider } from "../../../contextApis/rbac/userPermission/userPermissionProvider";

export const MasterUserPermissionPage = () => {
  return (
    <UserPermissionProvider>
      <UserPermissionPage />
    </UserPermissionProvider>
  );
};

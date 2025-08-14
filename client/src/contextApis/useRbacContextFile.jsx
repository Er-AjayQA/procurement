import { useContext } from "react";
import { RoleMasterContext } from "./rbac/roleMaster/roleMasterContext";
import { UserPermissionContext } from "./rbac/userPermission/userPermissionContext";

// Use Role Master Context
export const useRoleMasterContext = () => {
  const context = useContext(RoleMasterContext);
  if (context === undefined) {
    throw new Error(
      "useRoleMasterContext must be used within a RoleMasterProvider"
    );
  }
  return context;
};

// Use User Permission Context
export const useUserPermissionContext = () => {
  const context = useContext(UserPermissionContext);
  if (context === undefined) {
    throw new Error(
      "useUserPermissionContext must be used within a UserPermissionProvider"
    );
  }
  return context;
};

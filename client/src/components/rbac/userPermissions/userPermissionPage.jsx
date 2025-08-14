import { useUserPermissionContext } from "../../../contextApis/useRbacContextFile";
import { UserPermissionView } from "./userPermissionView";
import { UserPermissionListing } from "./userPermissionListing";
import { UserPermissionForm } from "./userPermissionForm";

export const UserPermissionPage = () => {
  const { componentType, handleComponentView } = useUserPermissionContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <UserPermissionListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <UserPermissionForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <UserPermissionView />}
      </div>
    </>
  );
};

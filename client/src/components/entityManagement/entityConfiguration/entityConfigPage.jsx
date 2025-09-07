import { EntityConfigListing } from "./entityConfigListing";
import { EntityConfigForm } from "./entityConfigForm";
import { EntityConfigView } from "./entityConfigView";
import { useEntityConfigContext } from "../../../contextApis/useEntityContextFile";

export const EntityConfigPage = () => {
  const { componentType, handleComponentView } = useEntityConfigContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <EntityConfigListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <EntityConfigForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <EntityConfigView />}
      </div>
    </>
  );
};

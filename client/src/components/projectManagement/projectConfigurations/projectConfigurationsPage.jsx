import { ProjectConfigurationsListing } from "./projectConfigurationsListing";
import { ProjectConfigurationsView } from "./projectConfigurationsView";
import { ProjectConfigurationsForm } from "./projectConfigurationsForm";
import { useProjectConfigurationsContext } from "../../../contextApis/useProjectContextFile";

export const ProjectConfigurationsPage = () => {
  const { componentType, handleComponentView } =
    useProjectConfigurationsContext();

  return (
    <>
      <div className="px-5 h-full">
        {/* Project Configurations Listing */}
        {componentType === "listing" && (
          <ProjectConfigurationsListing componentType={componentType} />
        )}

        {/* Project Configurations Form */}
        {componentType === "form" && (
          <ProjectConfigurationsForm
            onClose={() => handleComponentView("listing")}
          />
        )}

        {/* Project Configurations View */}
        {componentType === "view" && <ProjectConfigurationsView />}
      </div>
    </>
  );
};

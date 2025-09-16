import { useProjectConfigurationsContext } from "../../../contextApis/useProjectContextFile";
import { ProjectBasicDetails } from "./projectConfigurationsViewComponents/projectBasicDetails";
import { ProjectClientDetails } from "./projectConfigurationsViewComponents/projectClientDetails";
import { ProjectDescription } from "./projectConfigurationsViewComponents/projectDescription";

export const ProjectConfigurationsView = () => {
  const { data, handleComponentView, setViewId } =
    useProjectConfigurationsContext();

  const handleCancel = () => {
    handleComponentView("listing");
    setViewId(null);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3 border-b border-gray-400">
          <div>
            <p className="text-sm">
              <span className="font-bold">Project:</span> {data?.project_title}
            </p>
          </div>
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="rounded-md h-[80vh] overflow-auto scrollbar-hide">
          {/* Project Basic Details Sections */}
          <div className="py-5">
            <ProjectBasicDetails />
          </div>

          {/* Project Client Details Sections */}
          <div className="py-5">
            <ProjectClientDetails />
          </div>

          {/* Project Description Details Sections */}
          <div className="py-5">
            <ProjectDescription />
          </div>
        </div>
      </div>
    </>
  );
};

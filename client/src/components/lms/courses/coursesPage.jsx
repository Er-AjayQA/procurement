import { CoursesListing } from "./coursesListing";
import { CoursesForm } from "./coursesForm";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";
import { CoursesView } from "./coursesView";

export const CoursesPageComponent = () => {
  const { componentType, handleComponentView } = useCoursesMasterContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <CoursesListing
            componentType={componentType}
            handleComponentView={handleComponentView}
          />
        )}

        {componentType === "form" && (
          <CoursesForm
            onClose={() => handleComponentView("listing")}
            handleComponentView={handleComponentView}
          />
        )}

        {componentType === "view" && (
          <CoursesView handleComponentView={handleComponentView} />
        )}
      </div>
    </>
  );
};

import { RegisteredEventsListing } from "./registeredEventsListing";
import { RegisteredEventsView } from "./registeredEventsView";
import { RegisteredEventsForm } from "./registeredEventsForm";
import { useRegisteredEventsContext } from "../../../contextApis/useEventContextFile";

export const ProjectsConfigurationPage = () => {
  const { componentType, handleComponentView } = useRegisteredEventsContext();

  return (
    <>
      <div className="px-5 h-full">
        {/* Registered Events Listing */}
        {componentType === "listing" && (
          <RegisteredEventsListing componentType={componentType} />
        )}

        {/* Registered Events Form */}
        {componentType === "form" && (
          <RegisteredEventsForm
            onClose={() => handleComponentView("listing")}
          />
        )}

        {/* Registered Events View */}
        {componentType === "view" && <RegisteredEventsView />}
      </div>
    </>
  );
};

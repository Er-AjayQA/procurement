import { useRegisteredEventsContext } from "../../../contextApis/useEventContextFile";
import { EventBasicDetails } from "./registeredEventsViewComponents/eventBasicDetails";
import { EventRegistrationDetails } from "./registeredEventsViewComponents/eventRegistrationDetails";
import { EventVenueDetails } from "./registeredEventsViewComponents/eventVenueDetails";

export const RegisteredEventsView = () => {
  const { data, handleComponentView, setViewId } = useRegisteredEventsContext();

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
              <span className="font-bold">Event:</span> {data?.event_title}
            </p>
          </div>
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide">
          {/* Event Basic Details Sections */}
          <div className="py-5">
            <EventBasicDetails />
          </div>

          {/* Event Venue Sections */}
          <div className="py-5">
            <EventVenueDetails />
          </div>

          {/* Event Registration Details Sections */}
          <div className="py-5">
            <EventRegistrationDetails />
          </div>
        </div>
      </div>
    </>
  );
};

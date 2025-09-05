import { useRegisteredEventsContext } from "../../../contextApis/useEventContextFile";
import { EventBasicDetails } from "./registeredEventsViewComponents/eventBasicDetails";
import { EventDescription } from "./registeredEventsViewComponents/eventDescription";
import { EventRegistrationDetails } from "./registeredEventsViewComponents/eventRegistrationDetails";
import { EventVenueDetails } from "./registeredEventsViewComponents/eventVenueDetails";

export const RegisteredEventsView = () => {
  const { data, handleFormClose, handleComponentView, setViewId } =
    useRegisteredEventsContext();

  const handleCancel = () => {
    handleFormClose();
    handleComponentView("listing");
    setViewId(null);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3 border-b border-gray-400">
          <div>
            <p className="text-sm">
              <span className="font-bold">Subject:</span> {data?.ticket_subject}
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

          {/* Event Description Sections */}
          <div className="py-5">
            <EventDescription />
          </div>
        </div>
      </div>
    </>
  );
};

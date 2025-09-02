import { useHelpDeskContext } from "../../../contextApis/useEssContextFile";
import { TicketBasicDetails } from "./helpDeskViewComponents/ticketBasicDetails";
import { TicketDescription } from "./helpDeskViewComponents/ticketDescription";
import { TicketHistoryDetails } from "./helpDeskViewComponents/ticketHistoryDetails";

export const HelpDeskView = () => {
  const { data, handleFormClose, handleComponentView, setViewId } =
    useHelpDeskContext();

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
          {/* Ticket Basic Details Sections */}
          <div className="py-5">
            <TicketBasicDetails />
          </div>

          {/* Ticket Description Sections */}
          <div className="py-5">
            <TicketDescription />
          </div>

          {/* Ticket History Details Sections */}
          <div className="py-5">
            <TicketHistoryDetails />
          </div>
        </div>
      </div>
    </>
  );
};

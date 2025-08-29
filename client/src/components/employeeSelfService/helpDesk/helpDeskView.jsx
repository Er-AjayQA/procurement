import { useHelpDeskContext } from "../../../contextApis/useEssContextFile";
import { TicketHistoryDetails } from "./helpDeskViewComponents/ticketHistoryDetails";

export const HelpDeskView = () => {
  const { handleFormClose, handleComponentView } = useHelpDeskContext();

  const handleCancel = () => {
    handleFormClose();
    handleComponentView("listing");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3 border-b border-gray-400">
          <div>
            <p className="text-sm font-bold">View Transfer Request</p>
          </div>
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide">
          {/* Employee Transfer Details Sections */}
          <div className="py-5">
            <TicketHistoryDetails />
          </div>
        </div>
      </div>
    </>
  );
};

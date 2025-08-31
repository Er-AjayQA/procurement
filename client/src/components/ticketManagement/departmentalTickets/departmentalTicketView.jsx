import { useDepartmentalTicketsContext } from "../../../contextApis/useTicketContextFile";
import { TicketBasicDetails } from "./departmentalTicketViewComponents/ticketBasicDetails";
import { TicketHistoryDetails } from "./departmentalTicketViewComponents/ticketHistoryDetails";

export const DepartmentalTicketView = () => {
  const { handleFormClose, handleComponentView, setViewId } =
    useDepartmentalTicketsContext();

  const handleCancel = () => {
    handleComponentView("listing");
    setViewId(null);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3 border-b border-gray-400">
          <div>
            <p className="text-sm font-bold">Ticket Summary</p>
          </div>
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="rounded-md h-[80vh] overflow-auto scrollbar-hide">
          {/* Ticket Basic Details Sections */}
          <div className="py-5">
            <TicketBasicDetails />
          </div>

          {/* Ticket History Sections */}
          <div className="py-5">
            <TicketHistoryDetails />
          </div>
        </div>
      </div>
    </>
  );
};

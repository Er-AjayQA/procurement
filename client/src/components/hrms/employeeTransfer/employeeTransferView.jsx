import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeTransferDestinationDetails } from "./employeeTransferViewComponents/employeeTransferDestinationDetails";
import { EmployeeTransferDetails } from "./employeeTransferViewComponents/employeeTransferDetails";
import { EmployeeTransferSourceDetails } from "./employeeTransferViewComponents/employeeTransferSourceDetails";

export const EmployeeTransferView = () => {
  const { handleFormClose, handleComponentView } = useEmployeeTransferContext();

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
          {/* Employee Transfer Source Details Sections */}
          <div className="py-5">
            <EmployeeTransferSourceDetails />
          </div>

          {/* Employee Transfer Details Sections */}
          <div className="py-5">
            <EmployeeTransferDetails />
          </div>

          {/* Employee Transfer Destination Details Sections */}
          <div className="py-5">
            <EmployeeTransferDestinationDetails />
          </div>
        </div>
      </div>
    </>
  );
};

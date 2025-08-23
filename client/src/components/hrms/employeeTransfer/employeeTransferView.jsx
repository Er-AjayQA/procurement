import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeTransferDestinationDetails } from "./employeeTransferViewComponents/employeeTransferDestinationDetails";
import { EmployeeTransferSourceDetails } from "./employeeTransferViewComponents/employeeTransferSourceDetails";

export const EmployeeTransferView = () => {
  const { data, handleTabClick, handleComponentView } =
    useEmployeeTransferContext();

  return (
    <>
      <div className="flex flex-col">
        {/* Employee Transfer Source Details Sections */}
        <div className="py-5">
          <EmployeeTransferSourceDetails />
        </div>

        {/* Employee Transfer Destination Details Sections */}
        <div className="py-5">
          <EmployeeTransferDestinationDetails />
        </div>
      </div>
    </>
  );
};

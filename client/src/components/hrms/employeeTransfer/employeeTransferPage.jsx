import { EmployeeTransferListing } from "./employeeTransferListing";
import { EmployeeTransferForm } from "./employeeTransferForm";
import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeTransferView } from "./employeeTransferView";

export const EmployeeTransferPage = () => {
  const { componentType, handleComponentView } = useEmployeeTransferContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <EmployeeTransferListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <EmployeeTransferForm
            onClose={() => handleComponentView("listing")}
          />
        )}

        {componentType === "view" && <EmployeeTransferView />}
      </div>
    </>
  );
};

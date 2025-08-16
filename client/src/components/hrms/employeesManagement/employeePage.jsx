import { EmployeeView } from "./employeeView";
import { EmployeeListing } from "./employeeListing";
import { EmployeeForm } from "./employeeForm";
import { useEmployeeContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeePage = () => {
  const { componentType, handleComponentView } = useEmployeeContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <EmployeeListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <EmployeeForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <EmployeeView />}
      </div>
    </>
  );
};

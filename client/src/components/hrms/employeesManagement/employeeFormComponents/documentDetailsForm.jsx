import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeeDocumentDetailsForm = () => {
  const { data } = useEmployeeContext();
  return (
    <>
      <p>Employee Document Details</p>
    </>
  );
};

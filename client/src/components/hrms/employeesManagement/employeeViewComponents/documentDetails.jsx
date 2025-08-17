import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeeDocumentDetails = () => {
  const { data } = useEmployeeContext();
  return (
    <>
      <p>Employee Document Details</p>
    </>
  );
};

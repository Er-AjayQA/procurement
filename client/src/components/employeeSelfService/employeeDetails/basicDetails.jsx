import { useSelector } from "react-redux";

export const EmployeeBasicDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);
  return (
    <>
      <p>{employeeDetails?.name}</p>
    </>
  );
};

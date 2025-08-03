import { useSelector } from "react-redux";

export const EmployeeContractDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);

  return (
    <>
      <div className="flex gap-3">
        <div className="shadow-lg rounded-md basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Contract Type</h3>
          </div>
          <div className="grid grid-cols-3 p-3 gap-3">
            <div className="flex flex-col justify-center">
              <label className="text-[.8rem]">Contract Type</label>
              <p className="text-[.7rem]">
                {employeeDetails?.contract_type_name || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[.8rem]">Start Working Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.start_working_date || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[.8rem]">Probation End Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.start_working_date || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

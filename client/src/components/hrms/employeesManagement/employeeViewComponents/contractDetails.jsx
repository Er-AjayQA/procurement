import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeeContractDetails = () => {
  const { data } = useEmployeeContext();

  return (
    <>
      <div className="flex gap-3">
        <div className="shadow-lg rounded-md basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Contract Type</h3>
          </div>
          <div className="grid grid-cols-3 p-3 gap-3">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Contract Type</label>
              <p className="text-[.7rem]">
                {data?.contract_type_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Start Working Date</label>
              <p className="text-[.7rem]">
                {data?.start_working_date || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Probation End Date</label>
              <p className="text-[.7rem]">
                {data?.start_working_date || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

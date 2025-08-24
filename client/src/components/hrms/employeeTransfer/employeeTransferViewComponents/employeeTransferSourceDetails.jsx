import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeeTransferSourceDetails = () => {
  const { data } = useEmployeeTransferContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Current Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Employee Name</label>
            <p className="text-[.7rem]">
              {data?.requested_for_user_title} {data?.requested_for_user_name}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Employee Code</label>
            <p className="text-[.7rem]">{data?.emp_code || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Role</label>
            <p className="text-[.7rem]">{data?.from_role || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Department</label>
            <p className="text-[.7rem]">{data?.from_department || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Designation</label>
            <p className="text-[.7rem]">{data?.from_designation || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Reporting Manager</label>
            <p className="text-[.7rem]">
              {data?.report_to_manager_title} {data?.report_to_manager}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Branch</label>
            <p className="text-[.7rem]">{data?.from_branch || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

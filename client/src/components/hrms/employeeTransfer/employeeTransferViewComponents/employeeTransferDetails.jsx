import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeeTransferDetails = () => {
  const { data } = useEmployeeTransferContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Transfer Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Transfer Type</label>
            <p className="text-[.7rem]">{data?.transfer_type || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Transfer Reason</label>
            <p className="text-[.7rem]">{data?.reason_type}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Applicable From Date</label>
            <p className="text-[.7rem]">
              {data?.applicable_from_date || "N/A"}
            </p>
          </div>
          {data?.transfer_type === "Temporary" && (
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Applicable To Date</label>
              <p className="text-[.7rem]">
                {data?.applicable_to_date || "N/A"}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Remark</label>
            <p className="text-[.7rem]">{data?.detailed_reason || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

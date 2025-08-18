import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";

export const EmployeePaymentDetailsForm = () => {
  const { data } = useEmployeeContext();
  return (
    <>
      <div className="flex gap-3">
        <div className="shadow-lg rounded-md basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Bank Details</h3>
          </div>
          <div className="grid grid-cols-4 p-3 gap-3">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Bank Name</label>
              <p className="text-[.7rem]">{data?.bank_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Account Holder Name</label>
              <p className="text-[.7rem]">
                {data?.account_holder_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Account No.</label>
              <p className="text-[.7rem]">{data?.account_number || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">NUIT No.</label>
              <p className="text-[.7rem]">{data?.nuit_number || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">INSS Number</label>
              <p className="text-[.7rem]">{data?.inss_number || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">NIB Number</label>
              <p className="text-[.7rem]">{data?.nib_number || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

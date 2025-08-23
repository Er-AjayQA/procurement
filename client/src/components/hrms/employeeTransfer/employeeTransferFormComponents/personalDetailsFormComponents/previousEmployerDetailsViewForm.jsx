import { MdOutlineClose } from "react-icons/md";

export const PreviousEmployerDetailsViewItem = ({
  isView,
  onClose,
  viewData,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-[#0202025b] ${
          isView ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          isView ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            Previous Employer Detail
          </h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        <div className="py-5 px-10 mx-auto flex flex-col gap-5">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Company Name:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.company_name || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">From Date:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.from_date || "N/A"}</label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">To Date:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.to_date || "N/A"}</label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Last Drawn Salary:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.last_drawn_salary || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Location:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.location || "N/A"}</label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Reason of Leaving:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.reason_of_leaving}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

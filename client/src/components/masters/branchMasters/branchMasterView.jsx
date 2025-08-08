import { MdOutlineClose } from "react-icons/md";

export const BranchMasterView = ({ viewVisibility, onClose, data }) => {
  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          viewVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 end-0 w-[30%] bg-white z-30 h-full shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          viewVisibility ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        {/* Form Title */}
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">Branch Details</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={onClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-[80%] mt-[10%] h-full mx-auto">
          <div className="h-[75%] overflow-y-scroll scrollbar-hide flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Branch Code:</span>
              </div>
              <div>
                <span className="text-sm">{data?.branch_code || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Branch Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Contact Person Name:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.branch_contact_person || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Contact No.:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.branch_contact_number
                    ? `${data?.country_code} - ${data?.branch_contact_number}`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Alt. Contact No.:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.branch_alt_contact_number
                    ? `${data?.alt_country_code} - ${data?.branch_alt_contact_number}`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Email-Id:</span>
              </div>
              <div>
                <span className="text-sm">{data?.branch_emailId || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Alt. Email-Id:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.branch_alt_emailId || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Billing Status</span>
              </div>
              <div>
                <span className="text-sm">{data?.billing_status || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Status</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">In-Active</span>
                  )}
                </span>
              </div>
            </div>

            {/* Address Section */}
            <div className="shadow-lg mt-4 rounded-lg">
              <div className="haze_purple p-2  text-white rounded-t-lg">
                <h4 className="text-xs font-bold text-white ">Address</h4>
              </div>
              <div className="flex flex-col gap-2 p-2 py-5 bg-gray-100">
                <div className="grid grid-cols-2">
                  <span className="text-sm font-bold">Country:</span>
                  <span className="text-sm">{data?.country_name || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm font-bold">State:</span>
                  <span className="text-sm">{data?.state_name || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm font-bold">City:</span>
                  <span className="text-sm">{data?.city_name || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm font-bold">Address:</span>
                  <span className="text-sm">
                    {data?.branch_address || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

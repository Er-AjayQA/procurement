import { MdOutlineClose } from "react-icons/md";
import { useAllTicketsContext } from "../../../contextApis/useTicketContextFile";

export const ApproversPopup = ({ showApproverPopup, setShowApproverPopup }) => {
  const { data, setViewId } = useAllTicketsContext();

  // Handle Close Popup
  const handleClosePopup = () => {
    setViewId(null);
    setShowApproverPopup(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 backdrop-blur-sm transition-all duration-[.4s] ${
          showApproverPopup ? "block" : "hidden"
        }`}
      ></div>

      {/* List Form */}
      <div
        className={`absolute top-[50%] start-[50%] w-[60%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 min-h-[40%] shadow-lg rounded-lg transition-all duration-[.4s]`}
      >
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex items-center justify-between">
          <h3 className="text-white text-xs font-bold">Approvers Status</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white cursor-pointer"
            onClick={handleClosePopup}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="px-3 py-5">
          <div className="grid grid-cols-12 border border-gray-300 gap-2 bg-gray-100 rounded-t-lg">
            <div className="col-span-1 text-[.8rem] border-e border-gray-300 text-center font-bold py-3 px-2">
              S.No.
            </div>
            <div className="col-span-2 text-[.8rem] border-e border-gray-300 text-center font-bold py-3 px-2">
              Level
            </div>
            <div className="col-span-2 text-[.8rem] border-e border-gray-300 text-center font-bold py-3 px-2">
              Name
            </div>
            <div className="col-span-2 text-[.8rem] border-e border-gray-300 text-center font-bold py-3 px-2">
              Acted On
            </div>
            <div className="col-span-2 text-[.8rem] border-e border-gray-300 text-center font-bold py-3 px-2">
              Status
            </div>
            <div className="col-span-3 text-[.8rem] text-center font-bold py-3 px-2 relative">
              Remark
            </div>
          </div>
          <div className="h-[5%] overflow-auto">
            <div className="">
              {data?.workflow_detail.length > 0 ? (
                data?.workflow_detail.map((list, i) => {
                  const statusColor =
                    list?.approver_status === "APPROVED"
                      ? "text-green-600"
                      : list?.approver_status === "REJECTED"
                      ? "text-red-600"
                      : list?.approver_status === "PENDING"
                      ? "text-yellow-600"
                      : "text-gray-600";
                  return (
                    <div
                      key={list?.id}
                      className={`grid grid-cols-12 border border-gray-200  gap-2 ${
                        i + 1 === data?.workflow_detail.length
                          ? "rounded-b-lg"
                          : ""
                      }`}
                    >
                      <div className="col-span-1 border-e border-gray-300 flex items-center justify-center px-2 py-5 text-[.8rem]">
                        {i + 1}.
                      </div>
                      <div className="col-span-2 border-e border-gray-300 flex items-center justify-center px-2 py-5 text-[.8rem]">
                        {list?.approval_level || "N/A"}
                      </div>
                      <div className="col-span-2 border-e border-gray-300 flex items-center justify-center  px-2 py-5 text-[.8rem]">
                        {list?.USER_MASTER?.title} {list?.USER_MASTER?.name}
                      </div>
                      <div className="col-span-2 border-e border-gray-300 flex items-center justify-center  px-2 py-5 text-[.8rem]">
                        {list?.acted_on || "N/A"}
                      </div>
                      <div
                        className={`col-span-2 border-e border-gray-300 flex items-center justify-center px-2 py-5 text-xs font-bold overflow-hidden ${statusColor}`}
                      >
                        {list?.approver_status || "N/A"}
                      </div>
                      <div className="col-span-3 flex items-center px-2 py-5 text-[.8rem]">
                        {list?.comments || "N/A"}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid border-b border-gray-200 last:border-none">
                  <div className="p-5 text-[.8rem]">
                    <p className="text-center">No Records Found</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

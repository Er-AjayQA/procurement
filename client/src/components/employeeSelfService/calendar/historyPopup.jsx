import { MdOutlineClose } from "react-icons/md";
import { useCalendarContext } from "../../../contextApis/useEssContextFile";

export const TicketHistoryPopup = ({
  showApproverPopup,
  setShowApproverPopup,
}) => {
  const { data, setViewId, formatDateTime } = useCalendarContext();

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
        className={`absolute top-[50%] start-[50%] w-[70%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 min-h-[40%] shadow-lg rounded-lg transition-all duration-[.4s]`}
      >
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex items-center justify-between">
          <h3 className="text-white text-xs font-bold">Ticket History</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white cursor-pointer"
            onClick={handleClosePopup}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="basis-[90%] justify-around rounded-md pb-4 mx-auto">
          {/* Table Headers */}
          <div className="flex bg-gray-200">
            <div className="w-[100px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">S.No.</label>
            </div>
            <div className="w-[150px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Action By</label>
            </div>
            <div className="w-[300px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Action Taken</label>
            </div>
            <div className="w-[200px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Acted On</label>
            </div>
            <div className="w-[250px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Comment</label>
            </div>
            <div className="w-[150px] px-2 py-2 text-center font-bold">
              <label className="text-[.8rem]">Current Status</label>
            </div>
          </div>

          {/* Table Body */}

          {data?.history_detail?.map((list, i) => {
            return (
              <div className="flex" key={i}>
                <div className="flex items-center justify-center w-[100px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem]">{i + 1}</p>
                </div>
                <div
                  className={`flex items-center justify-center w-[150px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200 `}
                >
                  <p className="text-[.7rem] text-center">
                    {list?.action_by || "N/A"}
                  </p>
                </div>
                <div className="w-[300px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem]">{list?.action_taken || "N/A"} </p>
                </div>
                <div className="flex items-center justify-center w-[200px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem] text-center">
                    {formatDateTime(list?.action_date)}
                  </p>
                </div>
                <div
                  className={`flex items-center w-[250px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200 ${
                    list?.executive_remark ? "" : "justify-center"
                  }`}
                >
                  <p className="text-[.7rem]">
                    {list?.executive_remark || "-"}
                  </p>
                </div>
                <div className="flex items-center justify-center w-[150px] px-2 py-2 border-b border-b-gray-200">
                  <p
                    className={`text-[.7rem] font-bold  ${
                      (list?.current_status === "OPEN" && "text-green-600") ||
                      (list?.current_status === "CLOSE" && "text-red-600") ||
                      (list?.current_status === "ESCALATED" &&
                        "text-yellow-600") ||
                      (list?.current_status === "PICK" && "text-blue-600") ||
                      (list?.current_status === "ASSIGNED" && "text-pink-600")
                    }`}
                  >
                    {list?.current_status || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

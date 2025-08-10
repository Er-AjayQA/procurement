import { MdOutlineClose } from "react-icons/md";
import { useShiftMasterContext } from "../../../contextApis/useMastersContextFile";

export const ShiftMasterView = ({ onClose }) => {
  const { viewVisibility, data } = useShiftMasterContext();

  // Calculate Start Period
  const calculatePeriod = (time) => {
    if (!time) {
      return "AM";
    }
    const [hours, minutes] = time.split(":").map(Number);

    if (hours >= 12) {
      return "PM";
    } else if (hours === 0) {
      return "AM";
    } else if (hours <= 12) {
      return "AM";
    }
  };

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
          <h3 className="text-white text-sm font-bold">Shift Details</h3>
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
                <span className="text-sm font-bold">Shift Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Timings:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.start_time
                    ? `${data?.start_time} ${calculatePeriod(
                        data?.start_time
                      )} to ${data?.end_time} ${calculatePeriod(
                        data?.end_time
                      )}`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Duration:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.shift_duration ? `${data?.shift_duration} Hrs` : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Sites:</span>
              </div>
              <div>
                <span className="text-sm">{data?.sites || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Off Days/Month:</span>
              </div>
              <div>
                <span className="text-sm">{data?.off_days || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Working Hours/Month:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.working_hours_per_month
                    ? `${data?.working_hours_per_month} Hrs`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Working Days/Month:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.working_days_per_month || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Observations:</span>
              </div>
              <div>
                <span className="text-sm">{data?.observations || "N/A"}</span>
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
          </div>
        </div>
      </div>
    </>
  );
};

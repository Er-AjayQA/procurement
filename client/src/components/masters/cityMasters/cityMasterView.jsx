import { MdOutlineClose } from "react-icons/md";

export const CityMasterView = ({ viewVisibility, onClose, data }) => {
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
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">City Details</h3>
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
          <div className="h-[85%] overflow-y-scroll scrollbar-hide flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">City ID:</span>
              </div>
              <div>
                <span className="text-sm">{data?.id || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">City Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">State ID:</span>
              </div>
              <div>
                <span className="text-sm">{data?.state_id || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">State Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.state_name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Country ID:</span>
              </div>
              <div>
                <span className="text-sm">{data?.country_id || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Country Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.country_name || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

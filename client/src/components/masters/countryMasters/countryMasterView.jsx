import { MdOutlineClose } from "react-icons/md";

export const CountryMasterView = ({ viewVisibility, onClose, data }) => {
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
          <h3 className="text-white text-sm font-bold">Country Details</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={onClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-[70%] mt-[10%] h-full mx-auto">
          <div className="h-[85%] overflow-y-scroll scrollbar-hide flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">country Code:</span>
              </div>
              <div>
                <span className="text-sm">{data?.country_code || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Nationality:</span>
              </div>
              <div>
                <span className="text-sm">{data?.nationality || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Phone Code:</span>
              </div>
              <div>
                <span className="text-sm">+{data?.phone_code || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Currency Code:</span>
              </div>
              <div>
                <span className="text-sm">{data?.currency_code || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Currency Symbol:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.currency_symbol || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { MdOutlineClose } from "react-icons/md";
import { useItemMasterContext } from "../../../contextApis/useMastersContextFile";

export const ItemMasterView = ({ onClose }) => {
  const { viewVisibility, data } = useItemMasterContext();

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
          <h3 className="text-white text-sm font-bold">Item Details</h3>
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
                <span className="text-sm font-bold">Allowance Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">
                  Domestic Allowance Amount:
                </span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.domestic_allowance || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">
                  International Allowance Amount:
                </span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.international_allowance || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Taxable Status</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.is_taxable ? "Taxable" : "Non-Taxable"}
                </span>
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

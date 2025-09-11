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
        className={`absolute top-0 end-0 w-[50%] bg-white z-30 h-full shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
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
                <span className="text-sm font-bold">Item Category:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.item_category_name || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Item Name:</span>
              </div>
              <div>
                <span className="text-sm">{data?.name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Item Code:</span>
              </div>
              <div>
                <span className="text-sm">{data?.item_code || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">MVP:</span>
              </div>
              <div>
                <span className="text-sm">{data?.mvp || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Bar Code Type:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.bar_code_type ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Manage By:</span>
              </div>
              <div>
                <span className="text-sm">{data?.manage_by || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Threshold Stock:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.threshold_stock || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Item Type:</span>
              </div>
              <div>
                <span className="text-sm">{data?.item_type || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">UOM:</span>
              </div>
              <div>
                <span className="text-sm">{data?.uom_name || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Description:</span>
              </div>
              <div>
                <span className="text-sm">{data?.item_desc || "N/A"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Status:</span>
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

            {/* Specifications */}
            <div className="shadow-lg mt-5">
              <div className="flex justify-between bg-button-hover py-2 px-2 rounded-t-md">
                <h3 className="text-white text-xs font-bold">
                  Item Specifications
                </h3>
              </div>
              <div className="grid grid-cols-2 border-b border-b-gray-500">
                <div className="p-3 border-e border-e-gray-500">
                  <span className="font-bold">Type</span>
                </div>
                <div className="p-3">
                  <span className="font-bold">Description</span>
                </div>
              </div>
              {data?.specifications.length > 0 ? (
                data.specifications.map((spec, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-2 border-b border-b-gray-300 "
                    >
                      <div className="p-3 border-e border-e-gray-300">
                        <span>{spec.type}</span>
                      </div>
                      <div className="p-3">
                        <span>{spec.description}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p className="text-xs">No Specs Found!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { MdOutlineClose } from "react-icons/md";
import { useTicketCategoryMasterContext } from "../../../contextApis/useMastersContextFile";

export const TicketCategoryMasterView = ({ onClose }) => {
  const { viewVisibility, data } = useTicketCategoryMasterContext();

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
          <h3 className="text-white text-sm font-bold">
            Ticket Category Details
          </h3>
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
                <span className="text-sm font-bold">Category Name:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.ticket_category_name || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Category Code:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.ticket_category_code || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Category Priority:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.ticket_category_priority || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-bold">Description:</span>
              </div>
              <div>
                <span className="text-sm">
                  {data?.ticket_category_description || "N/A"}
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

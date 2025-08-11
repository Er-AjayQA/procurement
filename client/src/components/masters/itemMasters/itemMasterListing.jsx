import { MdEdit, MdDelete } from "react-icons/md";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { useItemMasterContext } from "../../../contextApis/useMastersContextFile";

export const ItemMasterListing = () => {
  const {
    isLoading,
    listing,
    handleFormVisibility,
    handleActiveInactive,
    setUpdateId,
    setDeleteId,
    page,
    totalPages,
    setPage,
    handleViewVisibility,
    setViewId,
  } = useItemMasterContext();

  return (
    <>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Item Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%] overflow-auto scrollbar-hide">
          <div className="grid grid-cols-8 border-b border-gray-300 gap-2 min-w-[900px]">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">Name</div>
            <div className="text-[.8rem] font-bold p-2">Item Code</div>
            <div className="text-[.8rem] font-bold p-2">Item Category</div>
            <div className="text-[.8rem] font-bold p-2">ManageBy</div>
            <div className="text-[.8rem] font-bold p-2">Type</div>
            <div className="text-[.8rem] font-bold p-2">Status</div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide min-w-[900px]">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                return (
                  <div
                    key={list.id}
                    className="grid grid-cols-8 border-b border-gray-200 last:border-none gap-2"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.item_code || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.item_category_name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.manage_by || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.item_type || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list.status ? (
                        <span className="text-green-400 font-bold text-[.8rem] flex gap-2 items-center">
                          <span
                            className="block w-[15px] h-[15px] bg-green-400 rounded-[50%] shadow-lg shadow-green-400 cursor-pointer"
                            onClick={() => handleActiveInactive(list.id)}
                          ></span>
                          <span className="text-green-400 font-bold text-[.8rem]">
                            Active
                          </span>
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold text-[.8rem] flex gap-2 items-center">
                          <span className="text-red-400 font-bold text-[.8rem]">
                            InActive
                          </span>
                          <span
                            className="block w-[15px] h-[15px] bg-red-400 rounded-[50%] shadow-lg shadow-red-400 cursor-pointer"
                            onClick={() => handleActiveInactive(list.id)}
                          ></span>
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleViewVisibility("open");
                          setViewId(list.id);
                        }}
                      >
                        <FaEye className="hover:fill-white" />
                      </div>
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleFormVisibility("open", "update");
                          setUpdateId(list.id);
                        }}
                      >
                        <MdEdit className="hover:fill-white" />
                      </div>
                      <div
                        className="p-1 hover:bg-red-600 rounded-lg cursor-pointer"
                        onClick={() => setDeleteId(list.id)}
                      >
                        <MdDelete className="hover:fill-white" />
                      </div>
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

        {/* Pagination */}
        <div className="bg-button-hover h-12 py-2 px-1 rounded-b-md">
          {listing && (
            <div className="flex justify-end pe-5 gap-2">
              <button
                className={`${
                  page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={page === 1}
              >
                <FaAngleDoubleLeft
                  className={`${page === 1 ? "fill-gray-400" : "fill-white"}`}
                  onClick={() => setPage(1)}
                />
              </button>
              <button
                className={`${
                  page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={page === 1}
              >
                <MdKeyboardArrowLeft
                  className={`${page === 1 ? "fill-gray-400" : "fill-white"}`}
                  onClick={() => setPage(page - 1)}
                />
              </button>
              {/* Page numbers */}
              <div className="flex gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                        page === pageNumber
                          ? "bg-white text-button-hover font-bold"
                          : "text-white hover:bg-white hover:text-button-hover"
                      }`}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>
              <button
                className={`${
                  page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={page === totalPages}
              >
                <MdKeyboardArrowRight
                  className={`${
                    page === totalPages ? "fill-gray-400" : "fill-white"
                  }`}
                  onClick={() => setPage(page + 1)}
                />
              </button>
              <button
                className={`${
                  page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={page === totalPages}
              >
                <FaAngleDoubleRight
                  className={`${
                    page === totalPages ? "fill-gray-400" : "fill-white"
                  }`}
                  onClick={() => setPage(totalPages)}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

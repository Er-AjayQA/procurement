import { FaEye } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { useCityMasterContext } from "../../../contextApis/useMastersContextFile";

export const CityMasterListing = () => {
  const {
    isLoading,
    listing,
    setViewId,
    page,
    totalPages,
    setPage,
    setViewVisibility,
  } = useCityMasterContext();
  // Function to get visible page numbers (max 5 at a time)
  const getVisiblePages = () => {
    const visiblePages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust if we're at the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };
  return (
    <>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Cities Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="grid grid-cols-5 border-b border-gray-300 gap-2">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">City Name</div>
            <div className="text-[.8rem] font-bold p-2">State Name</div>
            <div className="text-[.8rem] font-bold p-2">Country Name</div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                return (
                  <div
                    key={list.id}
                    className="grid grid-cols-5 border-b border-gray-200 last:border-none gap-2"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.state_name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.country_name || "N/A"}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          setViewVisibility("open");
                          setViewId(list.id);
                        }}
                      >
                        <FaEye className="hover:fill-white" />
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

              {/* Show first page and ellipsis if needed */}
              {getVisiblePages()[0] > 1 && (
                <>
                  <button
                    className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white hover:bg-white hover:text-button-hover"
                    onClick={() => setPage(1)}
                  >
                    1
                  </button>
                  {getVisiblePages()[0] > 2 && (
                    <span className="text-white flex items-center">...</span>
                  )}
                </>
              )}

              {/* Visible page numbers (max 5) */}
              <div className="flex gap-1 mx-2">
                {getVisiblePages().map((pageNumber) => (
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
                ))}
              </div>

              {/* Show last page and ellipsis if needed */}
              {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
                <>
                  {getVisiblePages()[getVisiblePages().length - 1] <
                    totalPages - 1 && (
                    <span className="text-white flex items-center">...</span>
                  )}
                  <button
                    className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white hover:bg-white hover:text-button-hover"
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

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

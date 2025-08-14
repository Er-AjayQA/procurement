import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";
import { CourseCards } from "./courseCards";
import { AddButton } from "../../UI/addButtonUi";

export const CoursesListing = ({ componentType, handleComponentView }) => {
  const {
    isLoading,
    listing,
    page,
    totalPages,
    setPage,
    filter,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    setViewId,
  } = useCoursesMasterContext();

  return (
    <>
      <div className="flex justify-between items-center pt-3 pb-10">
        <div className="flex items-center gap-5">
          {/* Sorting Element Start */}
          <div className="flex justify-center items-center gap-2">
            <label htmlFor="limit" className="text-sm">
              Limit
            </label>
            <select
              id="limit"
              className="rounded-md py-1 text-sm border-borders-light"
              onChange={(e) => handleLimitChange(e)}
            >
              <option value={10} className="text-sm">
                10
              </option>
              <option value={50} className="text-sm">
                50
              </option>
              <option value={100} className="text-sm">
                100
              </option>
              <option value={500} className="text-sm">
                500
              </option>
            </select>
          </div>
          {/* Sorting Element End */}
          <div className="flex items-center gap-5">
            <input
              type="search"
              name="name"
              value={filter.name}
              placeholder="Search here.."
              className="py-1 px-2 rounded-md text-sm border-borders-light"
              onChange={(e) => handleChangeFilter("input", e)}
            />
          </div>
        </div>
        {componentType === "listing" ? (
          <div onClick={() => handleComponentView("form")}>
            <AddButton text="Create Course" />
          </div>
        ) : (
          <div
            onClick={() => {
              handleComponentView("listing");
              setViewId(null);
              setUpdateId(null);
            }}
          >
            <AddButton text="Back" />
          </div>
        )}
      </div>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Course Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="h-[390px] overflow-y-auto scrollbar-hide p-2">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              <div className="flex flex-col gap-5">
                {listing?.map((list, i) => (
                  <CourseCards key={list.id} data={list} />
                ))}
              </div>
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

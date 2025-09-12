import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";
import { ViewIcon } from "../../UI/viewIconUi";
import { EditIcon } from "../../UI/editIconUi";
import { DeleteIcon } from "../../UI/deleteIcon";
import { useRegisteredEventsContext } from "../../../contextApis/useEventContextFile";
import { updateEventStatus } from "../../../services/eventManagement_services/service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const RegisteredEventsListing = ({ componentType }) => {
  const { userDetails, activeEntity } = useSelector((state) => state.auth);
  const {
    isLoading,
    listing,
    page,
    totalPages,
    setPage,
    setViewId,
    setUpdateId,
    setDeleteId,
    formatDateTime,
    departmentOptions,
    ticketCategoryOptions,
    statusOptions,
    styledComponent,
    handleLimitChange,
    handleChangeFilter,
    handleComponentView,
    getAllData,
  } = useRegisteredEventsContext();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle CHange Event Status
  const handleChangeStatus = async (id, e) => {
    try {
      const response = await updateEventStatus(id, { status: e.target.value });
      if (response.success) {
        toast.success(response.message);
        getAllData(activeEntity);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching ticket category:", error);
    }
  };

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
            <Select
              value={selectedCategory}
              onChange={(selectedOption) => {
                setSelectedCategory(selectedOption);
                handleChangeFilter("dropdown", {
                  field: "ticket_category_id",
                  value: selectedOption ? selectedOption.value : "",
                });
              }}
              options={ticketCategoryOptions}
              placeholder="Search by category..."
              isClearable
              isSearchable
              className="react-select-container"
              classNamePrefix="react-select"
              styles={styledComponent}
            />
            <Select
              value={selectedDepartment}
              onChange={(selectedOption) => {
                setSelectedDepartment(selectedOption);
                handleChangeFilter("dropdown", {
                  field: "created_for_dept_id",
                  value: selectedOption ? selectedOption.value : "",
                });
              }}
              options={departmentOptions}
              placeholder="Search by department..."
              isClearable
              isSearchable
              className="react-select-container"
              classNamePrefix="react-select"
              styles={styledComponent}
            />
          </div>
        </div>
        {componentType === "listing" ? (
          <div onClick={() => handleComponentView("form")}>
            <AddButton text="Generate Event" />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Events Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="flex border-b border-gray-300 gap-2 bg-gray-200">
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 w-[80px]">
              S.No.
            </div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 w-[150px]">
              Code
            </div>
            <div className="text-[.8rem] font-bold p-2 w-[200px]">Category</div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 w-[150px]">
              Event Type
            </div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 w-[250px]">
              Start Date
            </div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 w-[200px]">
              Registration
            </div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 text-center w-[200px]">
              Status
            </div>
            <div className="flex justify-center items-center text-[.8rem] font-bold p-2 text-center w-[250px]">
              Action
            </div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                const myListStatusColor =
                  list?.status === "DRAFT"
                    ? "text-yellow-600"
                    : list?.status === "PUBLISHED"
                    ? "text-green-600"
                    : list?.status === "CANCELLED"
                    ? "text-red-600"
                    : "text-blue-600";

                return (
                  <div
                    key={list?.id}
                    className="flex border-b border-gray-200 last:border-none gap-2 hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-center p-2 text-[.8rem] w-[80px]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center justify-center p-2 text-[.8rem] w-[150px]">
                      {list?.event_code || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem] w-[200px]">
                      {list?.event_category_name || "N/A"}
                    </div>
                    <div className="flex items-center justify-center p-2 text-[.8rem] w-[150px]">
                      {list?.event_type || "N/A"}
                    </div>
                    <div className="flex items-center justify-center p-2 text-[.8rem] w-[250px]">
                      {list?.event_start_date
                        ? formatDateTime(list?.event_start_date)
                        : "N/A"}
                    </div>
                    <div className="flex items-center justify-center p-2 text-[.8rem] w-[200px]">
                      {list?.is_paid ? "Required" : "Not-Required"}
                    </div>
                    <div
                      className={`flex items-center justify-center p-2 text-[.8rem] cursor-pointer text-xs w-[200px] font-bold ${myListStatusColor}`}
                    >
                      <select
                        name="status"
                        id="status"
                        className="py-1 px-1 rounded-lg border-t-0 border-r-0 border-l-0 border-b text-xs text-center"
                        onChange={(e) => handleChangeStatus(list?.id, e)}
                        value={list?.status}
                      >
                        {statusOptions?.map((status) => {
                          return (
                            <option
                              key={status.value}
                              value={status.value}
                              className="text-sm"
                            >
                              {status.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex items-center justify-center text-[.8rem] p-2 gap-2 w-[250px]">
                      <ViewIcon
                        onClick={() => {
                          handleComponentView("view");
                          setViewId(list?.id);
                        }}
                      />

                      {list?.status === "DRAFT" && (
                        <EditIcon
                          onClick={() => {
                            handleComponentView("form");
                            setUpdateId(list?.id);
                          }}
                        />
                      )}

                      {list?.status === "DRAFT" ? (
                        <DeleteIcon
                          onClick={() => {
                            setDeleteId(list?.id);
                          }}
                        />
                      ) : (
                        ""
                      )}
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

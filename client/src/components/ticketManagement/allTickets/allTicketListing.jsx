import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { ApproversPopup } from "./approversPopup";
import { useAllTicketsContext } from "../../../contextApis/useTicketContextFile";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { ViewIcon } from "../../UI/viewIconUi";
import { EditIcon } from "../../UI/editIconUi";
import { DeleteIcon } from "../../UI/deleteIcon";
import { AssignIcon } from "../../UI/assignIconUi";

export const AllTicketListing = ({ componentType }) => {
  const {
    isLoading,
    listing,
    page,
    totalPages,
    setPage,
    setViewId,
    userOptions,
    departmentOptions,
    ticketCategoryOptions,
    styledComponent,
    handleLimitChange,
    handleChangeFilter,
    handleComponentView,
  } = useAllTicketsContext();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showApproverPopup, setShowApproverPopup] = useState(false);

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
            <Select
              value={selectedUser}
              onChange={(selectedOption) => {
                setSelectedUser(selectedOption);
                handleChangeFilter("dropdown", {
                  field: "created_by_user_id",
                  value: selectedOption ? selectedOption.value : "",
                });
              }}
              options={userOptions}
              placeholder="Search by Employee..."
              isClearable
              isSearchable
              className="react-select-container"
              classNamePrefix="react-select"
              styles={styledComponent}
            />
          </div>
        </div>
      </div>

      {/* List Form */}
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">All Tickets Listing</h3>
        </div>

        <div className="p-3 h-[86%]">
          <div className="grid grid-cols-8 border-b border-gray-300 gap-2 bg-gray-200">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">Ticket Type</div>
            <div className="text-[.8rem] font-bold p-2">Employee Name</div>
            <div className="text-[.8rem] font-bold p-2">For Department</div>
            <div className="text-[.8rem] font-bold p-2">Category</div>
            <div className="text-[.8rem] font-bold p-2">Priority</div>
            <div className="text-[.8rem] font-bold p-2 text-center">
              Ticket Status
            </div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                const myListStatusColor =
                  list?.ticket_status === "OPEN"
                    ? "text-green-600"
                    : list?.ticket_status === "CLOSE"
                    ? "text-red-600"
                    : list?.ticket_status === "ESCALATED"
                    ? "text-yellow-600"
                    : "text-gray-600";

                return (
                  <div
                    key={list?.id}
                    className="grid grid-cols-8 border-b border-gray-200 last:border-none gap-2 hover:bg-gray-100"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      For {list?.ticket_type || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.created_for_userTitle} {list?.created_for_userName}
                      - {list?.created_for_user_code}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem] overflow-hidden">
                      <span className="text-[.8rem] overflow-x-auto scrollbar-hide">
                        {list?.created_for_deptName}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.ticket_category_name}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.ticket_category_priority}
                    </div>
                    <div
                      className={`flex items-center justify-center p-2 text-[.8rem] text-xs font-bold cursor-pointer ${myListStatusColor}`}
                      onClick={() => {
                        setViewId(list?.id);
                        setShowApproverPopup(true);
                      }}
                    >
                      {list?.ticket_status}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <ViewIcon
                        onClick={() => {
                          handleComponentView("view");
                          setViewId(list?.id);
                        }}
                      />
                      <AssignIcon
                        onClick={() => {
                          handleComponentView("view");
                          setViewId(list?.id);
                        }}
                      />
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

        {/* Display Approver Popup */}
        {showApproverPopup && (
          <ApproversPopup
            showApproverPopup={showApproverPopup}
            setShowApproverPopup={setShowApproverPopup}
          />
        )}

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

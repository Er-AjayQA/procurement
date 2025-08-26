import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";
import { ViewIcon } from "../../UI/viewIconUi";
import { EditIcon } from "../../UI/editIconUi";
import { DeleteIcon } from "../../UI/deleteIcon";
import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { ApproversPopup } from "./approversPopup";

export const EmployeeTransferListing = ({ componentType }) => {
  const {
    filter,
    isLoading,
    listing,
    tabType,
    currentTab,
    page,
    totalPages,
    setPage,
    rolesList,
    setViewId,
    setUpdateId,
    setDeleteId,
    styledComponent,
    handleLimitChange,
    handleChangeFilter,
    handleComponentView,
    handleTabClick,
    tabList,
  } = useEmployeeTransferContext();
  const [selectedRole, setSelectedRole] = useState(null);

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
            <input
              type="search"
              name="name"
              value={filter.name}
              placeholder="Search here.."
              className="py-1 px-2 rounded-md text-sm border-borders-light"
              onChange={(e) => handleChangeFilter("input", e)}
            />
            <Select
              value={selectedRole}
              onChange={(selectedOption) => {
                setSelectedRole(selectedOption);
                handleChangeFilter("dropdown", {
                  field: "role_id",
                  value: selectedOption ? selectedOption.value : "",
                });
              }}
              options={rolesList}
              placeholder="Search by role..."
              isClearable
              isSearchable
              className="react-select-container"
              classNamePrefix="react-select"
              styles={styledComponent}
            />
          </div>
        </div>
        {componentType === "listing" && currentTab === "my_requests" ? (
          <div onClick={() => handleComponentView("form")}>
            <AddButton text="Generate Transfer Request" />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Employee Tabs */}
      <div>
        <ul className="flex gap-5">
          {tabList.map((tab) => (
            <li
              key={tab.value}
              className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                currentTab === tab.value
                  ? "border-gray-300 bg-body-bg_color text-white"
                  : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">
            {tabType.name} Listing
          </h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="grid grid-cols-8 border-b border-gray-300 gap-2 bg-gray-200">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">Requested For</div>
            <div className="text-[.8rem] font-bold p-2">Employee Code</div>
            <div className="text-[.8rem] font-bold p-2">Created By</div>
            <div className="text-[.8rem] font-bold p-2">From Branch</div>
            <div className="text-[.8rem] font-bold p-2">To Branch</div>
            <div className="text-[.8rem] font-bold p-2 text-center">
              {currentTab === "my_requests"
                ? "Approval Status"
                : "Approver Status"}
            </div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                const myListStatusColor =
                  list?.approval_status === "APPROVED"
                    ? "text-green-600"
                    : list?.approval_status === "REJECTED"
                    ? "text-red-600"
                    : list?.approval_status === "PENDING"
                    ? "text-yellow-600"
                    : "text-gray-600";

                const otherStatusColor =
                  list?.approver_status === "APPROVED"
                    ? "text-green-600"
                    : list?.approver_status === "REJECTED"
                    ? "text-red-600"
                    : list?.approver_status === "PENDING"
                    ? "text-yellow-600"
                    : "text-gray-600";

                const allApproverApproved = list?.workflow_Details.every(
                  (data) => data?.approver_status === "PENDING"
                );
                return (
                  <div
                    key={list?.id}
                    className="grid grid-cols-8 border-b border-gray-200 last:border-none gap-2 hover:bg-gray-100"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.requested_for_user_title}
                      {list?.requested_for_user_name}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.emp_code || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem] overflow-hidden">
                      <span className="text-[.8rem] overflow-x-auto scrollbar-hide">
                        {list?.request_by_user_title}
                        {list?.requested_by_user}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.from_branch}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.to_branch}
                    </div>
                    <div
                      className={`flex items-center justify-center p-2 text-[.8rem] text-xs font-bold ${
                        currentTab === "my_requests" ? "cursor-pointer" : ""
                      } ${
                        currentTab === "my_requests"
                          ? myListStatusColor
                          : otherStatusColor
                      }`}
                      onClick={
                        currentTab === "my_requests"
                          ? () => {
                              setViewId(list?.id);
                              setShowApproverPopup(true);
                            }
                          : ""
                      }
                    >
                      {currentTab === "my_requests"
                        ? list?.approval_status
                        : list?.approver_status}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <ViewIcon
                        onClick={() => {
                          handleComponentView("view");
                          setViewId(list?.id);
                        }}
                      />

                      {(currentTab === "my_requests" && allApproverApproved) ||
                      currentTab === "pending_for_approval" ? (
                        <EditIcon
                          onClick={() => {
                            handleComponentView("form");
                            setUpdateId(list?.id);
                          }}
                        />
                      ) : (
                        ""
                      )}

                      {currentTab === "my_requests" && allApproverApproved ? (
                        <DeleteIcon onClick={() => setDeleteId(list?.id)} />
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

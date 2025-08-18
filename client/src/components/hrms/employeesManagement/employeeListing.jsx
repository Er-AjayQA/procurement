import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";
import { ViewIcon } from "../../UI/viewIconUi";
import { EditIcon } from "../../UI/editIconUi";
import { DeleteIcon } from "../../UI/deleteIcon";
import { useEmployeeContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeeListing = ({ componentType }) => {
  const {
    filter,
    isLoading,
    listing,
    page,
    getAllData,
    totalPages,
    setPage,
    rolesList,
    setViewId,
    setUpdateId,
    setDeleteId,
    handleLimitChange,
    handleChangeFilter,
    handleComponentClose,
    handleComponentView,
    handleActiveInactive,
    handleTabClick,
  } = useEmployeeContext();
  const [selectedRole, setSelectedRole] = useState(null);

  const styledComponent = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      minWidth: "300px",
      height: "32px",
      borderRadius: "0.375rem",
      borderColor: "#d1d5db", // gray-300
      fontSize: "0.875rem", // text-sm
      paddingLeft: "0.5rem", // px-2
      paddingRight: "0.5rem", // px-2
      "&:hover": {
        borderColor: "#d1d5db", // gray-300
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    input: (base) => ({
      ...base,
      margin: "0px",
      paddingBottom: "0px",
      paddingTop: "0px",
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.875rem", // text-sm
    }),
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
        {componentType === "listing" ? (
          <div onClick={() => handleComponentView("form")}>
            <AddButton text="Create Employee" />
          </div>
        ) : (
          <div
            onClick={() => {
              handleComponentView("listing");
              handleComponentClose();
              getAllData();
            }}
          >
            <AddButton text="Back" />
          </div>
        )}
      </div>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Employee Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="grid grid-cols-7 border-b border-gray-300 gap-2">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">User Name</div>
            <div className="text-[.8rem] font-bold p-2">User Role</div>
            <div className="text-[.8rem] font-bold p-2">Official Email</div>
            <div className="text-[.8rem] font-bold p-2">Phone No.</div>
            <div className="text-[.8rem] font-bold p-2 text-center">Status</div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                return (
                  <div
                    key={list?.id}
                    className="grid grid-cols-7 border-b border-gray-200 last:border-none gap-2"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.role_name || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem] overflow-hidden">
                      <span className="text-[.8rem] overflow-x-auto scrollbar-hide">
                        {list?.official_email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.contact_no || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem] justify-center">
                      {list.status ? (
                        <span className="text-green-400 font-bold text-[.8rem] flex gap-2 items-center">
                          <span
                            className="block w-[15px] h-[15px] bg-green-400 rounded-[50%] shadow-lg shadow-green-400 cursor-pointer"
                            onClick={() => handleActiveInactive(list?.id)}
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
                            onClick={() => handleActiveInactive(list?.id)}
                          ></span>
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <ViewIcon
                        onClick={() => {
                          handleComponentView("view");
                          handleTabClick("basic_details");
                          setViewId(list?.id);
                        }}
                      />
                      <EditIcon
                        onClick={() => {
                          handleComponentView("form");
                          setUpdateId(list?.id);
                        }}
                      />
                      <DeleteIcon onClick={() => setDeleteId(list?.id)} />
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

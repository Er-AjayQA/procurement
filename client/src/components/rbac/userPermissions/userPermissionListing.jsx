import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye } from "react-icons/fa";
import Select from "react-select";
import {
  MdDelete,
  MdEdit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useUserPermissionContext } from "../../../contextApis/useRbacContextFile";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";

export const UserPermissionListing = ({
  componentType,
  handleComponentView,
}) => {
  const {
    isLoading,
    listing,
    page,
    totalPages,
    setPage,
    filter,
    usersList,
    setViewId,
    setUpdateId,
    setDeleteId,
    handleViewVisibility,
    handleLimitChange,
    handleChangeFilter,
    handleFormVisibility,
    handleComponentClose,
    styledComponent,
  } = useUserPermissionContext();
  const [selectedUser, setSelectedUser] = useState(null);

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
              value={selectedUser}
              onChange={(selectedOption) => {
                setSelectedUser(selectedOption);
                handleChangeFilter("dropdown", {
                  field: "user_id",
                  value: selectedOption ? selectedOption.value : "",
                });
              }}
              options={usersList}
              placeholder="Search by user..."
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
            <AddButton text="Assign Module" />
          </div>
        ) : (
          <div
            onClick={() => {
              handleComponentView("listing");
              handleComponentClose();
            }}
          >
            <AddButton text="Back" />
          </div>
        )}
      </div>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">
            User Permissions Listing
          </h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[86%]">
          <div className="grid grid-cols-5 border-b border-gray-300 gap-2">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">User Name</div>
            <div className="text-[.8rem] font-bold p-2">User Role</div>
            <div className="text-[.8rem] font-bold p-2">
              Total Modules Assigned
            </div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <SkeltonUi />
            ) : listing?.length > 0 ? (
              listing?.map((list, i) => {
                return (
                  <div
                    key={list?.userId}
                    className="grid grid-cols-5 border-b border-gray-200 last:border-none gap-2"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.userName || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.roleName || "N/A"}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {list?.totalModules || "N/A"}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleViewVisibility("open");
                          setViewId(list?.id);
                        }}
                      >
                        <FaEye className="hover:fill-white" />
                      </div>
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleFormVisibility("open", "update");
                          setUpdateId(list?.id);
                        }}
                      >
                        <MdEdit className="hover:fill-white" />
                      </div>
                      <div
                        className="p-1 hover:bg-red-600 rounded-lg cursor-pointer"
                        onClick={() => setDeleteId(list?.id)}
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

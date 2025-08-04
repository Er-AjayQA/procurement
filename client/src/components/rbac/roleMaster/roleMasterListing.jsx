import { MdEdit, MdDelete } from "react-icons/md";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const RoleMasterListing = ({
  rolesList,
  handleFormVisibility,
  handleRoleActiveInactive,
  setUpdateId,
  setDeleteId,
  page,
  totalPages,
  setPage,
}) => {
  return (
    <>
      <div className="shadow-lg rounded-md border border-gray-300 h-full flex flex-col">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Roles Listing</h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-full">
          <div className="grid grid-cols-4 border-b border-gray-300 gap-2">
            <div className="text-[.8rem] font-bold p-2">S.No.</div>
            <div className="text-[.8rem] font-bold p-2">Name</div>
            <div className="text-[.8rem] font-bold p-2">Status</div>
            <div className="text-[.8rem] font-bold p-2 text-center">Action</div>
          </div>
          <div className="h-full overflow-y-scroll scrollbar-hide">
            {rolesList?.length > 0 ? (
              rolesList?.map((role, i) => {
                return (
                  <div
                    key={role.id}
                    className="grid grid-cols-4 border-b border-gray-200 last:border-none gap-2"
                  >
                    <div className="flex items-center p-2 text-[.8rem]">
                      {i + 1}.
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {role.name}
                    </div>
                    <div className="flex items-center p-2 text-[.8rem]">
                      {role.status ? (
                        <span className="text-green-400 font-bold text-[.8rem] flex gap-2 items-center">
                          <span
                            className="block w-[15px] h-[15px] bg-green-400 rounded-[50%] shadow-lg shadow-green-400 cursor-pointer"
                            onClick={() => handleRoleActiveInactive(role.id)}
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
                            onClick={() => handleRoleActiveInactive(role.id)}
                          ></span>
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center text-[.8rem] items-center p-2 gap-2">
                      <div
                        className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleFormVisibility("open", "update");
                          setUpdateId(role.id);
                        }}
                      >
                        <MdEdit className="hover:fill-white" />
                      </div>
                      <div className="p-1 hover:bg-red-600 rounded-lg cursor-pointer">
                        <MdDelete
                          className="hover:fill-white"
                          onClick={() => setDeleteId(role.id)}
                        />
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

        <div className="bg-button-hover py-2 px-1 rounded-b-md">
          <div className="flex justify-end pe-5 gap-2">
            <button
              className={`${
                page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={page === 1 ? true : false}
            >
              <FaAngleDoubleLeft
                className={`${page === 1 ? "fill-gray-400" : "fill-white"}`}
                onClick={() => setPage(1)}
              />
            </button>
            <button className="cursor-pointer">
              <MdKeyboardArrowLeft
                className="fill-white"
                onClick={() => setPage(page - 1)}
              />
            </button>
            <button className="cursor-pointer">
              <MdKeyboardArrowRight
                className="fill-white"
                onClick={() => setPage(page + 1)}
              />
            </button>
            <button className="cursor-pointer">
              <FaAngleDoubleRight
                className="fill-white"
                onClick={() => setPage(totalPages)}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

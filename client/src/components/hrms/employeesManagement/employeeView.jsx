import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useEmployeeContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeeView = () => {
  const {
    basicDetails,
    data,
    handleComponentClose,
    handleComponentView,
    viewModules,
  } = useEmployeeContext();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-button-hover py-2 px-4 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-sm font-bold">
            RBAC Permissions Details
          </h3>
        </div>
        <div>
          <button
            onClick={() => {
              handleComponentView("listing");
              handleComponentClose();
            }}
            className="bg-white py-1 px-4 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto scrollbar-hide p-4">
        {/* COURSE BASIC DETAILS */}

        {viewModules
          ? viewModules.map((module) => {
              return (
                <div className="mb-10" key={module?.moduleId}>
                  <div className="bg-gray-100 py-2 px-3 rounded-md">
                    <h4 className="text-sm text-gray-700 font-bold">
                      {module?.moduleName}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-8 py-5 px-3">
                    {/* Row 1 */}
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-3 flex flex-col gap-2">
                        <label className="text-xs font-bold">Sub Modules</label>
                      </div>
                      <div className="col-span-3 flex flex-col gap-2">
                        <label className="text-xs font-bold">Read</label>
                      </div>
                      <div className="col-span-3 flex flex-col gap-2">
                        <label className="text-xs font-bold">Write</label>
                      </div>
                      <div className="col-span-3 flex flex-col gap-2">
                        <label className="text-xs font-bold">Delete</label>
                      </div>
                    </div>
                    {module?.submodules.length > 0
                      ? module?.submodules.map((data) => {
                          return (
                            <div className="grid grid-cols-12 gap-5">
                              <div className="col-span-3 flex flex-col gap-2">
                                <p className="text-xs">
                                  {data?.submoduleName || "N/A"}
                                </p>
                              </div>
                              <div className="col-span-3 flex flex-col gap-2">
                                <p className="text-xs">
                                  {data?.read ? (
                                    <FaCheckCircle className="w-[20px] h-[20px] fill-green-700" />
                                  ) : (
                                    <GiCancel className="w-[20px] h-[20px] fill-red-700" />
                                  )}
                                </p>
                              </div>
                              <div className="col-span-3 flex flex-col gap-2">
                                <p className="text-xs">
                                  {data?.write ? (
                                    <FaCheckCircle className="w-[20px] h-[20px] fill-green-700" />
                                  ) : (
                                    <GiCancel className="w-[20px] h-[20px] fill-red-700" />
                                  )}
                                </p>
                              </div>
                              <div className="col-span-3 flex flex-col gap-2">
                                <p className="text-xs">
                                  {data?.delete ? (
                                    <FaCheckCircle className="w-[20px] h-[20px] fill-green-700" />
                                  ) : (
                                    <GiCancel className="w-[20px] h-[20px] fill-red-700" />
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

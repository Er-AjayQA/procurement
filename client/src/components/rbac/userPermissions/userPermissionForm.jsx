import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CancelButton } from "../../UI/cancelButtonUi";
import { AddButton } from "../../UI/addButtonUi";
import { useUserPermissionContext } from "../../../contextApis/useRbacContextFile";
import { allUsersModuleAccessService } from "../../../services/rbac_services/service";

// Main Form Component
export const UserPermissionForm = ({ onClose }) => {
  const {
    formType,
    getAllData,
    data,
    updateId,
    handleComponentClose,
    handleComponentView,
    allModules,
    usersList,
    rolesList,
    getAllUsersList,
  } = useUserPermissionContext();

  const [moduleList, setModuleList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserDetails, setUpdatedUserDetails] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  // Get Updated User Assigned Module details
  const getUserAssignedModules = async () => {
    const response = await allUsersModuleAccessService({
      limit: 1000,
      page: "",
      filter: { user_id: updateId },
    });

    if (response.success) {
      setUpdatedUserDetails(response.data[0]);
    }
  };

  // Set form values when in update mode
  useEffect(() => {
    if (updateId) {
      console.log("Updated User Details....", updatedUserDetails);

      // Set selected role and user
      const role = rolesList?.find(
        (r) => r.value === updatedUserDetails?.roleId.toString()
      );
      const user = usersList?.find(
        (u) => u.value === updatedUserDetails?.userId.toString()
      );

      setSelectedRole(role);
      setSelectedUser(user);

      // Set module permissions
      // Set module permissions
      if (updatedUserDetails?.permissions) {
        const permissions = updatedUserDetails.permissions.flatMap((module) =>
          module.submodules.map((submodule) => ({
            module_id: module.moduleId,
            submodule_id: submodule.submoduleId,
            read: submodule.read,
            write: submodule.write,
            delete: submodule.delete,
          }))
        );
        setModuleList(permissions);
      }
    } else {
      setSelectedRole(null);
      setSelectedUser(null);
      setModuleList([]);
    }
  }, [updateId, data]);

  // Check Is Module Selected
  const isModuleSelected = (moduleId) => {
    const module = allModules?.find((m) => m.id === moduleId);

    if (!module) return false;

    return module.RBAC_SUBMODULE_MASTERs.every((submodule) => {
      const permission = moduleList?.find(
        (item) =>
          item.module_id === moduleId && item.submodule_id === submodule.id
      );
      return permission?.read && permission?.write && permission?.delete;
    });
  };

  // Handle Select Whole Module At Once
  const handleSelectWholeModule = (moduleId) => {
    const module = allModules?.find((m) => m.id === moduleId);
    if (!module) return false;

    const isSelected = isModuleSelected(moduleId);

    if (isSelected) {
      setModuleList((prev) =>
        prev.filter((item) => item.module_id !== moduleId)
      );
    } else {
      const newItems = module.RBAC_SUBMODULE_MASTERs.map((submodule) => ({
        module_id: moduleId,
        submodule_id: submodule.id,
        read: true,
        write: true,
        delete: true,
      }));

      const filteredList = moduleList.filter(
        (item) => item.module_id !== moduleId
      );

      setModuleList([...filteredList, ...newItems]);
    }
  };

  // Handle Permission Change
  const handlePermissionChange = (
    moduleId,
    submoduleId,
    permissionType,
    value
  ) => {
    setModuleList((prev) => {
      const existingindex = prev.findIndex(
        (item) =>
          item.module_id === moduleId && item.submodule_id === submoduleId
      );

      if (existingindex >= 0) {
        const updated = [...prev];
        updated[existingindex] = {
          ...updated[existingindex],
          [permissionType]: value,
        };

        return updated;
      } else {
        return [
          ...prev,
          {
            module_id: moduleId,
            submodule_id: submoduleId,
            read: permissionType === "read" ? value : false,
            write: permissionType === "write" ? value : false,
            delete: permissionType === "delete" ? value : false,
          },
        ];
      }
    });
  };

  // Check if a specific permission is granted
  const hasPermission = (moduleId, submoduleId, permissionType) => {
    const item = moduleList?.find(
      (item) => item.module_id === moduleId && item.submodule_id === submoduleId
    );
    return item ? item[permissionType] : false;
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        role_id: selectedRole.value,
        user_id: selectedUser.value,
        module_list: moduleList,
      };

      console.log(payload);

      // let response = await createCourse(payload);

      // For now, just log and show success
      toast.success(
        formType === "Update"
          ? "Course updated successfully!"
          : "Course created successfully!"
      );
      onClose();
      getAllData();
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error("Submission error:", error);
    }
  };

  const selectStyles = {
    control: (base, { isDisabled, isFocused }) => ({
      ...base,
      minHeight: "35px",
      fontSize: "0.875rem",
      borderRadius: "0.375rem",
      borderColor: isDisabled
        ? "#e5e7eb"
        : isFocused
        ? "#3b82f6"
        : errors[base.name]
        ? "#ef4444"
        : "#d1d5db",
      boxShadow: isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: isDisabled ? "#e5e7eb" : "#9ca3af",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      fontSize: "0.875rem",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: "0 4px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    option: (base, { isSelected }) => ({
      ...base,
      fontSize: "0.875rem",
      backgroundColor: isSelected ? "#3b82f6" : "white",
      color: isSelected ? "white" : "#111827",
      "&:hover": {
        backgroundColor: isSelected ? "#3b82f6" : "#f3f4f6",
      },
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
  };

  // Select Users
  useEffect(() => {
    getAllUsersList(selectedRole?.value);
  }, [selectedRole]);

  // Get User Assigned Module
  useEffect(() => {
    getUserAssignedModules();
  }, [updateId]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-button-hover py-2 px-4 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-sm">
            {!updateId ? "Add User Permission" : "Update User Permission"}
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

      {/* Form Content */}
      <div className="flex-1 overflow-auto scrollbar-hide p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-4">
              <Select
                value={selectedRole}
                onChange={(selectedOption) => {
                  setSelectedRole(selectedOption);
                }}
                options={rolesList}
                placeholder="Select role..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyles}
              />
            </div>
            <div className="col-span-4">
              <Select
                value={selectedUser}
                onChange={(selectedOption) => {
                  setSelectedUser(selectedOption);
                }}
                options={usersList}
                placeholder="Select user..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyles}
              />
            </div>
          </div>

          {/* Modules Selection */}
          {allModules?.length > 0
            ? allModules?.map((module, i) => {
                const isModuleFullySelected = isModuleSelected(module.id);
                const modulePermissions = data?.[0]?.permissions?.find(
                  (perm) => perm.moduleId === module.id
                );
                return (
                  <div className="mb-10" key={module?.id}>
                    <div className="bg-gray-100 py-2 px-3 rounded-md flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`module_id${i}`}
                        checked={isModuleFullySelected}
                        className="border border-black cursor-pointer"
                        onClick={() => handleSelectWholeModule(module?.id)}
                      />
                      <label
                        className="text-sm text-gray-700 font-bold cursor-pointer"
                        htmlFor={`module_id${i}`}
                      >
                        {module?.module_name}
                      </label>
                    </div>

                    <div className="flex flex-col gap-8 py-5 px-3">
                      {/* Row 1 */}
                      <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-3 flex flex-col gap-2">
                          <label className="text-xs font-bold">
                            Sub Modules
                          </label>
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
                      {module?.RBAC_SUBMODULE_MASTERs.length > 0
                        ? module?.RBAC_SUBMODULE_MASTERs.map((data) => {
                            const hasRead = hasPermission(
                              module.id,
                              data.id,
                              "read"
                            );
                            const hasWrite = hasPermission(
                              module.id,
                              data.id,
                              "write"
                            );
                            const hasDelete = hasPermission(
                              module.id,
                              data.id,
                              "delete"
                            );
                            return (
                              <div
                                className="grid grid-cols-12 gap-5"
                                key={data?.id}
                              >
                                <div className="col-span-3 flex flex-col gap-2">
                                  <p className="text-xs">
                                    {data?.submodule_name || "N/A"}
                                  </p>
                                </div>
                                <div className="col-span-3 flex flex-col gap-2">
                                  <input
                                    type="checkbox"
                                    className="border border-black"
                                    checked={hasRead}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        module?.id,
                                        data?.id,
                                        "read",
                                        !hasRead
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-span-3 flex flex-col gap-2">
                                  <input
                                    type="checkbox"
                                    className="border border-black"
                                    checked={hasWrite}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        module?.id,
                                        data?.id,
                                        "write",
                                        !hasWrite
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-span-3 flex flex-col gap-2">
                                  <input
                                    type="checkbox"
                                    className="border border-black"
                                    checked={hasDelete}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        module?.id,
                                        data?.id,
                                        "delete",
                                        !hasDelete
                                      )
                                    }
                                  />
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

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <CancelButton onClick={onClose} text={"Cancel"} />
            <AddButton text={`${!updateId ? "Assign" : "Update Assign"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

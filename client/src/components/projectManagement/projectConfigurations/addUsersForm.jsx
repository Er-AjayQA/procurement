import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import { useProjectConfigurationsContext } from "../../../contextApis/useProjectContextFile";
import { useCallback, useEffect, useState } from "react";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";
import { toast } from "react-toastify";

export const AddUsersItem = ({
  user,
  index,
  onChange,
  onRemove,
  assignedUsersList,
  userError,
  isEditMode,
}) => {
  const { data, updateId, departmentOptions, formSelectStyles } =
    useProjectConfigurationsContext();

  const {
    key,
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dep_id: isEditMode ? user.dep_id || "" : "",
      user_id: isEditMode ? user.user_id || "" : "",
    },
  });

  const selectedDepartment = watch("dep_id");
  const [usersListOption, setUsersListOption] = useState(null);

  // Get All Already Selected Users
  const getFilteredUsersList = useCallback(
    (allUsers) => {
      const selectedUserIds = assignedUsersList
        .filter((item) => item.id !== user.id && item.user_id)
        .map((item) => item.user_id);

      return allUsers
        .filter((data) => data.dep_id === selectedDepartment)
        .filter((data) => !selectedUserIds.includes(data.id))
        .map((data) => ({
          value: data?.id,
          label: `${data.title} ${data.name} - ${data.emp_code}`,
        }));
    },
    [assignedUsersList, user.id, selectedDepartment]
  );

  // Get Users List
  const getUsersList = async () => {
    try {
      const response = await getAllEmployeeDetails({
        limit: 5000,
        page: "",
        filter: {
          role_id: "",
          user_id: "",
        },
      });

      if (response.success) {
        let allUsers = response?.data?.filter(
          (data) => data?.dep_id === selectedDepartment
        );

        const filteredUsers = getFilteredUsersList(allUsers);

        setUsersListOption(filteredUsers);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUsersListOption(null);
    }
  };

  // Set form values when in update mode - FIXED VERSION
  useEffect(() => {
    if (isEditMode && data) {
      const setUpdateDefaultData = async () => {
        try {
          setValue("dep_id", user.dep_id || "");
          setValue("user_id", user.user_id || "");
        } catch (error) {
          console.error("Error setting update data:", error);
          toast.error("Failed to load ticket data");
        }
      };

      setUpdateDefaultData();
    }
  }, [isEditMode, data, setValue]);

  // Fetching the users list on selecting department
  useEffect(() => {
    if (selectedDepartment) {
      getUsersList();
    } else if (selectedDepartment === "") {
      setUsersListOption(null);
    }
  }, [selectedDepartment]);

  // Helper function to find selected option
  const findSelectedOption = useCallback((options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value) || null;
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-12 w-full border-b border-b-gray-300 gap-3 py-3"
        key={key}
      >
        <div className="col-span-2 px-3 py-3 text-xs flex items-center justify-center">
          {index + 1}.
        </div>
        {/* Department */}
        <div className="col-span-4 flex flex-col gap-3">
          <label htmlFor="dep_id" className="text-sm hidden">
            Department
          </label>
          <Controller
            name="dep_id"
            control={control}
            rules={{ required: "Department is required!" }}
            render={({ field }) => (
              <Select
                {...field}
                options={departmentOptions}
                value={findSelectedOption(departmentOptions, field.value)}
                onChange={(selected) => {
                  field.onChange(selected?.value || "");
                  onChange(user.id, "dep_id", selected?.value || "");
                }}
                placeholder="Select department..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={formSelectStyles}
              />
            )}
          />
          {errors.dep_id && (
            <p className="text-red-500 text-[.7rem]">{errors.dep_id.message}</p>
          )}
        </div>

        {/* User */}
        <div className="col-span-4 flex flex-col gap-3">
          <label htmlFor="user_id" className="text-sm hidden">
            User
          </label>
          <Controller
            name="user_id"
            control={control}
            rules={{ required: "User is required!" }}
            render={({ field }) => (
              <Select
                {...field}
                options={usersListOption}
                value={findSelectedOption(usersListOption, field?.value)}
                onChange={(selected) => {
                  field.onChange(selected?.value || "");
                  onChange(user.id, "user_id", selected?.value || "");
                }}
                placeholder="Select user..."
                isClearable
                isSearchable
                isDisabled={!selectedDepartment}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={formSelectStyles}
              />
            )}
          />
          {errors.user_id && (
            <p className="text-red-500 text-[.7rem]">
              {errors.user_id.message}
            </p>
          )}
        </div>

        <div className="col-span-2 flex justify-center items-center basis-[20%] p-3">
          <button
            type="button"
            onClick={() => onRemove(user?.id)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { useProjectConfigurationsContext } from "../../../contextApis/useProjectContextFile";
import { IoMdAdd } from "react-icons/io";
import { AddUsersItem } from "./addUsersForm";
import {
  createProject,
  updateProject,
} from "../../../services/projectManagement_services/service";

export const ProjectConfigurationsForm = () => {
  const { userDetails, activeEntity } = useSelector((state) => state.auth);
  const {
    data,
    updateId,
    handleComponentView,
    setUpdateId,
    setData,
    loginUserData,
    userOptions,
    countryCodeOptions,
    developmentTypeOptions,
    refreshData,
    formSelectStyles,
  } = useProjectConfigurationsContext();

  const isEditMode = Boolean(updateId);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      project_title: "",
      project_description: "",
      project_start_date: "",
      target_end_date: "",
      client_name: "",
      client_contact_person: "",
      client_email: "",
      client_contact_country_code: "",
      client_contact_no: "",
    },
  });

  const [assignedUsersList, setAssignedUsersList] = useState([]);
  const [userError, setUserError] = useState({});

  // Reset form function
  const resetForm = useCallback(() => {
    reset({
      project_title: "",
      project_description: "",
      project_start_date: "",
      target_end_date: "",
      client_name: "",
      client_contact_person: "",
      client_email: "",
      client_contact_country_code: "",
      client_contact_no: "",
    });
  }, [reset]);

  // Add Users
  const handleAddUsers = () => {
    setAssignedUsersList([
      ...assignedUsersList,
      { id: Date.now() + Math.random(), dep_id: "", user_id: "" },
    ]);
  };

  // Change User
  const handleAssignedUserChange = (id, field, value) => {
    const updated = assignedUsersList.map((item) => {
      if (item.id === id) {
        // Check for duplicate users when changing user_id
        if (field === "user_id" && value !== "") {
          const isDuplicate = assignedUsersList.some(
            (userItem) => userItem.user_id === value && userItem.id !== id
          );

          if (isDuplicate) {
            toast.error("This user is already assigned to the project!");
            setUserError((prev) => ({ ...prev, [id]: "duplicate" }));
            return { ...item, [field]: value };
          }
        }

        if (field === "dep_id") {
          if (value === "") {
            setUserError((prev) => ({ ...prev, [id]: "department" }));
            return { ...item, [field]: value, user_id: "" }; // Reset user when department changes
          } else {
            setUserError((prev) => {
              const newErrors = { ...prev };
              delete newErrors[id];
              return newErrors;
            });
          }
        } else if (field === "user_id") {
          if (value === "") {
            setUserError((prev) => ({ ...prev, [id]: "user" }));
            return { ...item, [field]: value };
          } else {
            setUserError((prev) => {
              const newErrors = { ...prev };
              delete newErrors[id];
              return newErrors;
            });
          }
        }
        return { ...item, [field]: value };
      }
      return item;
    });

    setAssignedUsersList(updated);
  };

  // Remove Users
  const handleRemoveAssignedUser = (id) => {
    const updated = assignedUsersList.filter((item) => item.id !== id);
    setAssignedUsersList(updated);

    setUserError((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  // Handle Click Cancel Button
  const handleCancel = useCallback(() => {
    resetForm();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  }, [resetForm, handleComponentView, setData, setUpdateId]);

  // Set form values when in update mode - FIXED VERSION
  useEffect(() => {
    if (isEditMode && data) {
      const setUpdateDefaultData = async () => {
        try {
          // Format dates for datetime-local inputs
          const formatDateForInput = (dateString) => {
            if (!dateString) return "";
            return moment(dateString).format("YYYY-MM-DD");
          };

          setValue("project_title", data?.project_title);
          setValue("development_mode", data?.development_mode);
          setValue("project_manager_id", data?.project_manager_id);
          setValue("project_description", data?.project_description);
          setValue(
            "project_start_date",
            formatDateForInput(data?.project_start_date)
          );
          setValue(
            "target_end_date",
            formatDateForInput(data?.target_end_date)
          );
          setValue("client_name", data?.client_name);
          setValue("client_contact_person", data?.client_contact_person);
          setValue("client_email", data?.client_email);
          setValue(
            "client_contact_country_code",
            data?.client_contact_country_code
          );
          setValue("client_contact_no", data?.client_contact_no);
          setAssignedUsersList(data?.assignedUsersList);
        } catch (error) {
          console.error("Error setting update data:", error);
          toast.error("Failed to load ticket data");
        }
      };

      setUpdateDefaultData();
    }
  }, [isEditMode, data, setValue, userOptions, loginUserData]);

  // Handle Form Submission
  const onSubmit = async (formData) => {
    try {
      const payload = {
        project_title: formData?.project_title,
        development_mode: formData?.development_mode,
        project_description: formData?.project_description,
        project_start_date: formData?.project_start_date,
        project_manager_id: formData?.project_manager_id,
        target_end_date: formData?.target_end_date,
        client_name: formData?.client_name,
        client_contact_person: formData?.client_contact_person,
        client_email: formData?.client_email,
        client_contact_country_code: formData?.client_contact_country_code,
        client_contact_no: formData?.client_contact_no,
        assignedUsersList: assignedUsersList,
      };

      const response = isEditMode
        ? await updateProject(activeEntity, updateId, payload)
        : await createProject(activeEntity, payload);

      if (response.success) {
        toast.success(response.message);

        if (typeof refreshData === "function") {
          refreshData();
        }

        resetForm();
        handleComponentView("listing");
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Helper function to find selected option
  const findSelectedOption = useCallback((options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value) || null;
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-3 border-b border-gray-400">
        <div>
          <p className="text-sm font-bold">
            {isEditMode ? "Update" : "Add"} Project
          </p>
        </div>
        <button
          className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration-300"
          onClick={handleCancel}
        >
          Back
        </button>
      </div>

      <div className="rounded-md h-[80vh] overflow-auto scrollbar-hide py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            {/* Basic Details Section */}
            <div className="flex flex-col shadow-lg rounded-t-lg">
              {/* Section Title */}
              <div className="p-2 bg-gray-200 rounded-t-lg">
                <h5 className="text-gray-600 font-bold text-xs">
                  Basic Details
                </h5>
              </div>

              {/* Section Body */}
              <div className="p-5 py-2 pb-5 flex flex-col gap-10 border border-gray-100">
                {/* Row - 1 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Project Name */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="project_title" className="text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="project_title"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="project name..."
                      {...register("project_title", {
                        required: "Project name is required!",
                      })}
                    />
                    {errors.project_title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.project_title.message}
                      </p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="project_start_date" className="text-sm">
                      Started From
                    </label>
                    <input
                      type="date"
                      id="project_start_date"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="project started from..."
                      {...register("project_start_date", {
                        required: "Started date is required!",
                      })}
                    />
                    {errors.project_start_date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.project_start_date.message}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="target_end_date" className="text-sm">
                      Target End Date
                    </label>
                    <input
                      type="date"
                      id="target_end_date"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="project end date..."
                      {...register("target_end_date")}
                    />
                  </div>
                </div>

                {/* Row - 2 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Project Manager Dropdown */}
                  <div className="col-span-4 flex flex-col gap-3">
                    <label htmlFor="project_manager_id" className="text-sm">
                      Project Manager
                    </label>
                    <Controller
                      name="project_manager_id"
                      control={control}
                      rules={{ required: "Project manager is required!" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={userOptions}
                          value={findSelectedOption(userOptions, field.value)}
                          onChange={(selected) =>
                            field.onChange(selected?.value || "")
                          }
                          placeholder="Select project manager..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={formSelectStyles}
                        />
                      )}
                    />
                    {errors.project_manager_id && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.project_manager_id.message}
                      </p>
                    )}
                  </div>

                  {/* Development Mode Dropdown */}
                  <div className="col-span-4 flex flex-col gap-3">
                    <label htmlFor="development_mode" className="text-sm">
                      Development Mode
                    </label>
                    <Controller
                      name="development_mode"
                      control={control}
                      rules={{ required: "Development mode is required!" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={developmentTypeOptions}
                          value={findSelectedOption(
                            developmentTypeOptions,
                            field.value
                          )}
                          onChange={(selected) =>
                            field.onChange(selected?.value || "")
                          }
                          placeholder="Select development mode..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={formSelectStyles}
                        />
                      )}
                    />
                    {errors.project_manager_id && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.project_manager_id.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row - 3 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Project Description */}
                  <div className="col-span-8 flex flex-col gap-2">
                    <label htmlFor="project_description" className="text-sm">
                      Description
                    </label>
                    <textarea
                      name="project_description"
                      id="project_description"
                      rows={5}
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="project description..."
                      {...register("project_description", {
                        required: "Project description is required!",
                      })}
                    />
                    {errors.project_description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.project_description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Client Details Section */}
            <div className="flex flex-col shadow-lg rounded-t-lg">
              {/* Section Title */}
              <div className="p-2 bg-gray-200 rounded-t-lg">
                <h5 className="text-gray-600 font-bold text-xs">
                  Client Details
                </h5>
              </div>

              {/* Section Body */}
              <div className="p-5 py-2 pb-5 flex flex-col gap-10 border border-gray-100">
                {/* Row - 1 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Client Name */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="client_name" className="text-sm">
                      Client Name
                    </label>
                    <input
                      type="text"
                      id="client_name"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="client name..."
                      {...register("client_name", {
                        required: "Client name is required!",
                      })}
                    />
                    {errors.client_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.client_name.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Person Name */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="client_contact_person" className="text-sm">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="client_contact_person"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="contact person name..."
                      {...register("client_contact_person", {
                        required: "Contact person is required!",
                      })}
                    />
                    {errors.client_contact_person && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.client_contact_person.message}
                      </p>
                    )}
                  </div>

                  {/* Client Email Id */}
                  <div className="col-span-4 flex flex-col gap-2">
                    <label htmlFor="client_email" className="text-sm">
                      Contact EmailId
                    </label>
                    <input
                      type="text"
                      id="client_email"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="client email..."
                      {...register("client_email", {
                        required: "Client email is required!",
                      })}
                    />
                    {errors.client_email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.client_email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row - 2 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Client Contact Number */}
                  <div className="col-span-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="client_contact_country_code"
                        className="text-sm"
                      >
                        Contact No.
                      </label>
                      <div className="flex">
                        <Controller
                          name="client_contact_country_code"
                          control={control}
                          rules={{ required: "Country code is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryCodeOptions || []}
                              value={findSelectedOption(
                                countryCodeOptions,
                                field.value
                              )}
                              onChange={(selected) =>
                                field.onChange(selected?.value || "")
                              }
                              placeholder="code"
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={{
                                ...formSelectStyles,
                                width: "120px",
                                borderTopRightRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                            />
                          )}
                        />
                        <input
                          type="text"
                          id="client_contact_no"
                          className="flex-grow rounded-e-lg border-s-0 text-[.8rem] border-borders-inputHover"
                          placeholder="Enter contact number"
                          {...register("client_contact_no", {
                            required: "Contact number is required!",
                          })}
                        />
                      </div>
                      {errors.client_contact_country_code &&
                      errors.client_contact_no ? (
                        <p className="text-red-500 text-[.7rem]">
                          Both country code and contact number are required!
                        </p>
                      ) : errors.client_contact_country_code ? (
                        <p className="text-red-500 text-[.7rem]">
                          {errors.client_contact_country_code.message}
                        </p>
                      ) : errors.client_contact_no ? (
                        <p className="text-red-500 text-[.7rem]">
                          {errors.client_contact_no.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Users Section */}
            <div className="flex flex-col shadow-lg rounded-t-lg">
              {/* Section Title */}
              <div className="p-2 flex items-center justify-between bg-gray-200 rounded-t-lg">
                <h5 className="text-gray-600 font-bold text-xs">Add Users</h5>
                <button
                  type="button"
                  onClick={() => handleAddUsers()}
                  className="flex items-center text-xs"
                >
                  <IoMdAdd className="mr-1 fill-gray-209" />
                </button>
              </div>

              {/* Section Body */}
              <div className="p-5 py-2 pb-5 flex flex-col gap-10 border border-gray-100">
                {/* Display error message if there are user assignment errors */}
                {(Object.keys(userError).length > 0 ||
                  assignedUsersList.some(
                    (user) => !user.dep_id || !user.user_id
                  )) && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                    Users row can't be empty!
                  </div>
                )}

                {/* Row - 1 */}
                {assignedUsersList.length > 0 ? (
                  <div className="border border-gray-200 rounded-md">
                    <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold gap-3">
                      <div className="col-span-2 p-2 text-xs font-bold text-center">
                        S.No
                      </div>
                      <div className="col-span-4 p-2 text-xs font-bold text-center">
                        Department
                      </div>
                      <div className="col-span-4 p-2 text-xs font-bold text-center">
                        Employee
                      </div>
                      <div className="col-span-2 p-2 text-xs font-bold text-center">
                        Action
                      </div>
                    </div>
                    {assignedUsersList.map((user, index) => (
                      <AddUsersItem
                        key={user.id}
                        assignedUsersList={assignedUsersList}
                        user={user}
                        index={index}
                        userError={userError}
                        onChange={handleAssignedUserChange}
                        onRemove={handleRemoveAssignedUser}
                        isEditMode={isEditMode}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-12 text-center py-4 text-sm text-gray-500 border border-gray-200 rounded-md">
                    No content added yet
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300"
                >
                  {isSubmitting
                    ? "Processing..."
                    : isEditMode
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

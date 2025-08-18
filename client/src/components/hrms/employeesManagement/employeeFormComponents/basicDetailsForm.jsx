import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { getAllArea } from "../../../../services/master_services/service";
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";

export const EmployeeBasicDetailsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      code: "",
      contact_no: "",
      alt_code: "",
      alt_contact_no: "",
      dob: "",
      gender: "",
      personal_email: "",
      official_email: "",
      reporting_manager_id: "",
      role_id: "",
      emp_type_id: "",
      designation_id: "",
      dep_id: "",
      area_id: "",
      userImage: null,
    },
  });

  // Watch department changes
  const selectedDepartment = watch("dep_id");

  const {
    data,
    getAllData,
    updateId,
    tabType,
    rolesList,
    handleTabClick,
    handleComponentView,
    countryCodeOptions,
    reportingManagerOptions,
    departmentOptions,
    designationOptions,
    employeeTypeOptions,
    areaOptions,
    setAreaOptions,
    formSelectStyles,
    setCreatedUserId,
    branchOptions,
  } = useEmployeeContext();

  const [titleOptions] = useState([
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Miss.", label: "Miss." },
  ]);
  const [genderOptions] = useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]);
  const [previewImage, setPreviewImage] = useState(null);
  const userImage = useRef(null);

  // Add this function to handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Set value for form submission
      setValue("userImage", file);
    }
  };

  // Handle Image Click
  const handleImageClick = () => {
    userImage.current.click();
  };

  // Get Area List
  const getAllAreaOptions = async (deptId) => {
    try {
      if (!deptId) {
        setAreaOptions([]);
        return;
      }
      const response = await getAllArea({
        limit: 5000,
        page: "",
        filter: {
          name: "",
          dept_id: deptId,
        },
      });

      if (response.success) {
        setAreaOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setAreaOptions([]);
      toast.error(error.message || "Failed to load areas");
    }
  };

  // Get Area when department change
  useEffect(() => {
    if (selectedDepartment) {
      getAllAreaOptions(selectedDepartment);
    } else {
      setAreaOptions([]);
    }
  }, [selectedDepartment]);

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      reset({
        title: data.title || "",
        name: data.name || "",
        code: data.code || "",
        contact_no: data.contact_no || "",
        alt_code: data.alt_code || "",
        alt_contact_no: data.alt_contact_no || "",
        dob: data.dob || "",
        gender: data.gender || "",
        personal_email: data.personal_email || "",
        official_email: data.official_email || "",
        reporting_manager_id: data.reporting_manager_id || "",
        role_id: data.role_id || "",
        emp_type_id: data.emp_type_id || "",
        designation_id: data.designation_id || "",
        dep_id: data.dep_id || "",
        area_id: data.area_id || "",
      });
    } else {
      reset({
        title: "",
        name: "",
        code: "",
        contact_no: "",
        alt_code: "",
        alt_contact_no: "",
        dob: "",
        gender: "",
        personal_email: "",
        official_email: "",
        reporting_manager_id: "",
        role_id: "",
        emp_type_id: "",
        designation_id: "",
        dep_id: "",
        area_id: "",
      });
    }
  }, [updateId, data, reset]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        tab_type: tabType,
        name: `${formData.title} ${formData.name}`,
        contact_no: `${formData.code}-${formData.contact_no}`,
        alt_contact_no: `${formData.alt_code}-${formData.alt_contact_no}`,
        dob: formData.dob,
        gender: formData.gender,
        personal_email: formData.personal_email,
        official_email: formData.official_email,
        reporting_manager_id: formData.reporting_manager_id,
        role_id: formData.role_id,
        emp_type_id: formData.emp_type_id,
        designation_id: formData.designation_id,
        dep_id: formData.dep_id,
        area_id: formData.area_id,
      };

      console.log("Form submitted:", payload);

      let response;
      // Uncomment and use your actual API call
      if (updateId) {
        response = await updateEmployee(updateId, payload);
      } else {
        response = await createEmployee(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("personal_details");
        getAllData();
        setCreatedUserId(response?.data);
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3 flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Row-1 */}
            <div className="grid grid-cols-12 gap-5">
              {/* User Image */}
              <div className="col-span-4 flex flex-col gap-3">
                {/* <label className="text-sm">Profile Image</label> */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={userImage}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {previewImage
                        ? "Change Profile Image"
                        : "Upload Profile Image"}
                    </button>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setValue("userImage", null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800 mt-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                {errors.userImage && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.userImage.message}
                  </p>
                )}
              </div>

              {/* Name Title */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={titleOptions}
                      value={findSelectedOption(titleOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select title..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Employee Name */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter employee name"
                  {...register("name", {
                    required: "Employee Name is required!",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Contact Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="code" className="text-sm">
                    Contact No.
                  </label>
                  <div className="flex">
                    <Controller
                      name="code"
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
                      id="contact_no"
                      className="flex-grow rounded-e-lg border-s-0 text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter contact number"
                      {...register("contact_no", {
                        required: "Contact number is required!",
                      })}
                    />
                  </div>
                  {errors.code && errors.contact_no ? (
                    <p className="text-red-500 text-[.7rem]">
                      Both country code and contact number are required!
                    </p>
                  ) : errors.code ? (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.code.message}
                    </p>
                  ) : errors.contact_no ? (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.contact_no.message}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Alt Contact Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="alt_code" className="text-sm">
                    Alt. Contact No.
                  </label>
                  <div className="flex">
                    <Controller
                      name="alt_code"
                      control={control}
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
                      id="alt_contact_no"
                      className="flex-grow rounded-e-lg border-s-0 text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter contact number"
                      {...register("alt_contact_no")}
                    />
                  </div>
                </div>
              </div>

              {/* DOB */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="dob" className="text-sm">
                  D.O.B
                </label>
                <input
                  type="date"
                  id="dob"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Date of birth..."
                  {...register("dob", {
                    required: "Employee DOB is required!",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.dob.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-3 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Gender */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="gender" className="text-sm">
                  Gender
                </label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={genderOptions}
                      value={findSelectedOption(genderOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select gender..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Personal Email */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="personal_email" className="text-sm">
                  Personal Email
                </label>
                <input
                  type="email"
                  id="personal_email"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Email..."
                  {...register("personal_email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.personal_email && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.personal_email.message}
                  </p>
                )}
              </div>

              {/* Official Email */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="official_email" className="text-sm">
                  Official Email
                </label>
                <input
                  type="email"
                  id="official_email"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Email..."
                  {...register("official_email", {
                    required: "Official email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.official_email && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.official_email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-4 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Reporting Manager */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="reporting_manager_id" className="text-sm">
                  Reporting Manager
                </label>
                <Controller
                  name="reporting_manager_id"
                  control={control}
                  rules={{ required: "Reporting manager is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={reportingManagerOptions}
                      value={findSelectedOption(
                        reportingManagerOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select reporting manager..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.reporting_manager_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.reporting_manager_id.message}
                  </p>
                )}
              </div>

              {/* Role List */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="role_id" className="text-sm">
                  Role
                </label>
                <Controller
                  name="role_id"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={rolesList}
                      value={findSelectedOption(rolesList, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select role..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.role_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.role_id.message}
                  </p>
                )}
              </div>

              {/* Employee Type */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="emp_type_id" className="text-sm">
                  Employee Type
                </label>
                <Controller
                  name="emp_type_id"
                  control={control}
                  rules={{ required: "Employee type is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={employeeTypeOptions}
                      value={findSelectedOption(
                        employeeTypeOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select employee type..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.emp_type_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.emp_type_id.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-5 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Designation */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="designation_id" className="text-sm">
                  Designation
                </label>
                <Controller
                  name="designation_id"
                  control={control}
                  rules={{ required: "Designation is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={designationOptions}
                      value={findSelectedOption(
                        designationOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select designation..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.designation_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.designation_id.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="dep_id" className="text-sm">
                  Department
                </label>
                <Controller
                  name="dep_id"
                  control={control}
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departmentOptions || []}
                      value={findSelectedOption(departmentOptions, field.value)}
                      onChange={(selected) => {
                        field.onChange(selected?.value || "");
                        setValue("area_id", "");
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
                  <p className="text-red-500 text-[.7rem]">
                    {errors.dep_id.message}
                  </p>
                )}
              </div>

              {/* Area */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="area_id" className="text-sm">
                  Area
                </label>
                <Controller
                  name="area_id"
                  control={control}
                  rules={{ required: "Area is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={areaOptions || []}
                      value={findSelectedOption(areaOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select area..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.area_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.area_id.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-6 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Branch */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="branch_id" className="text-sm">
                  Branch
                </label>
                <Controller
                  name="branch_id"
                  control={control}
                  rules={{ required: "Branch is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={branchOptions || []}
                      value={findSelectedOption(branchOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select branch..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.branch_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.branch_id.message}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-center gap-5">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                  onClick={() => handleComponentView("listing")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
                >
                  {updateId ? "Update & Next" : "Save & Next"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

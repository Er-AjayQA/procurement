import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllArea } from "../../../../services/master_services/service";

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
    },
  });

  // Watch department changes
  const selectedDepartment = watch("dep_id");

  const {
    data,
    updateId,
    rolesList,
    handleTabClick,
    countryCodeOptions,
    countryListOptions,
    reportingManagerOptions,
    departmentOptions,
    designationOptions,
    employeeTypeOptions,
    areaOptions,
    setAreaOptions,
    formSelectStyles,
  } = useEmployeeContext();

  const [titleOptions, setTitleOptions] = useState([
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Miss.", label: "Miss." },
  ]);
  const [genderOptions, setGenderOptions] = useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]);

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
      getAllAreaOptions(selectedDepartment?.value);
    } else {
      setAreaOptions([]);
    }
  }, [selectedDepartment]);

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      reset({
        name: data.name || data[0]?.name || "",
        domestic_allowance:
          data.domestic_allowance || data[0]?.domestic_allowance || "",
        international_allowance:
          data.international_allowance ||
          data[0]?.international_allowance ||
          "",
        is_taxable: data.is_taxable || data[0]?.is_taxable || "",
      });
    } else {
      reset({
        name: "",
        domestic_allowance: "",
        international_allowance: "",
        is_taxable: false,
      });
    }
  }, [updateId, data, reset, setValue]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name || "",
        domestic_allowance: formData.domestic_allowance || "",
        international_allowance: formData.international_allowance || "",
        is_taxable: formData.is_taxable || false,
      };

      // if (response.success) {
      //   toast.success(response.message);
      //   handleFormClose();
      //   getAllData();
      // } else {
      //   toast.error(response.message || "Operation failed");
      // }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      throw new Error(error.message);
    }
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || !value) return null;
    return options.find((opt) => opt.value === value);
  };
  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3 flex-grow">
          {/* <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Basic Information</h3>
          </div> */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select title..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("title")}
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
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={countryCodeOptions || {}}
                            value={findSelectedOption(
                              countryCodeOptions,
                              field.value
                            )}
                            onChange={(selected) =>
                              field.onChange(selected?.value || null)
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
                            {...register("code")}
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
                    {errors.contact_no && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.contact_no.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Row-2 */}
              <div className="grid grid-cols-12 gap-5">
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
                            options={countryCodeOptions || {}}
                            value={findSelectedOption(
                              countryCodeOptions,
                              field.value
                            )}
                            onChange={(selected) =>
                              field.onChange(selected?.value || null)
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
                            {...register("alt_code")}
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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select gender..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("gender")}
                      />
                    )}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row-3 */}
              <div className="grid grid-cols-12 gap-5">
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
                    {...register("personal_email")}
                  />
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
                    })}
                  />
                  {errors.official_email && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.official_email.message}
                    </p>
                  )}
                </div>

                {/* Reporting Manager */}
                <div className="col-span-4 flex flex-col gap-3">
                  <label htmlFor="reporting_manager_id" className="text-sm">
                    Reporting Manager
                  </label>
                  <Controller
                    name="reporting_manager_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={reportingManagerOptions}
                        value={findSelectedOption(
                          reportingManagerOptions,
                          field.value
                        )}
                        onChange={(selected) =>
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select reporting manager..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("reporting_manager_id")}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Row-4 */}
              <div className="grid grid-cols-12 gap-5">
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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select role..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("role_id")}
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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select employee type..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("emp_type_id")}
                      />
                    )}
                  />
                  {errors.emp_type_id && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.emp_type_id.message}
                    </p>
                  )}
                </div>

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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select designation..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("designation_id")}
                      />
                    )}
                  />
                  {errors.designation_id && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.designation_id.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row-5 */}
              <div className="grid grid-cols-12 gap-5">
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
                        value={findSelectedOption(
                          departmentOptions,
                          field.value
                        )}
                        onChange={(selected) => {
                          field.onChange(selected?.value || null);
                          setValue("area_id", "");
                        }}
                        placeholder="Select department..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("dep_id")}
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
                          field.onChange(selected?.value || null)
                        }
                        placeholder="Select area..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("area_id")}
                      />
                    )}
                  />
                  {errors.area_id && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.area_id.message}
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
                        value={rolesList.find(
                          (opt) =>
                            opt.value === field.value?.value ||
                            opt.value === field.value
                        )}
                        onChange={(selected) => field.onChange(selected)}
                        placeholder="Select role..."
                        isClearable
                        isSearchable
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={formSelectStyles}
                        {...register("role_id")}
                      />
                    )}
                  />
                  {errors.role_id && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.role_id.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

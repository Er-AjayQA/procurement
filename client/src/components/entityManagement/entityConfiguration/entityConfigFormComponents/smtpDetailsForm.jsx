import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";
import {
  createEntity,
  updateEntity,
} from "../../../../services/entityManagement_services/service";

export const EntitySmtpDetailsForm = () => {
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

  const {
    data,
    getAllData,
    updateId,
    tabType,
    handleTabClick,
    handleComponentView,
    countryCodeOptions,
    formSelectStyles,
    setCreatedUserId,
  } = useEntityConfigContext();

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

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data && countryCodeOptions.length > 0) {
      const setUpdateDefaultData = () => {
        setValue("title", data?.title);
        setValue("name", data?.name);
        setValue("contact_code", data?.contact_code);
        setValue("contact_no", data?.contact_no);
        setValue("alt_contact_code", data?.alt_contact_code);
        setValue("alt_contact_no", data?.alt_contact_no);
        setValue("dob", data?.dob);
        setValue("gender", data?.gender);
        setValue("personal_email", data?.personal_email);
        setValue("official_email", data?.official_email);
        setValue("reporting_manager_id", data?.reporting_manager_id);
        setValue("role_id", data?.role_id);
        setValue("emp_type_id", data?.emp_type_id);
        setValue("designation_id", data?.designation_id);
        setValue("dep_id", data?.dep_id);
        setValue("area_id", data?.area_id);
        setValue("branch_id", data?.branch_id);

        if (data?.title) {
          const option = titleOptions?.find(
            (item) => item.value === data.title
          );

          if (option) {
            setValue("title", option.value);
          }
        }

        if (data?.contact_code) {
          const option = countryCodeOptions?.find(
            (item) => item.value == data.contact_code
          );

          if (option) {
            setValue("contact_code", option.value);
          }
        }

        if (data?.alt_contact_code) {
          const option = countryCodeOptions?.find(
            (item) => item.value == data?.alt_contact_code
          );

          if (option) {
            setValue("alt_contact_code", option.value);
          }
        }
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, setValue]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        tab_type: tabType,
        title: formData.title,
        name: formData.name,
        contact_code: formData.code,
        contact_no: formData.contact_no,
        alt_contact_code: formData.alt_code,
        alt_contact_no: formData.alt_contact_no,
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

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        response = await createEntity(payload);
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
              {/* Server Address */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="smtp_server_address" className="text-sm">
                  Server Address
                </label>
                <input
                  type="text"
                  id="smtp_server_address"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter server address"
                  {...register("smtp_server_address", {
                    required: "Smtp server address is required!",
                  })}
                />
                {errors.smtp_server_address && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.smtp_server_address.message}
                  </p>
                )}
              </div>

              {/* Port Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="smtp_port_no" className="text-sm">
                  Port Number
                </label>
                <input
                  type="text"
                  id="smtp_port_no"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter port number"
                  {...register("smtp_port_no", {
                    required: "Port number is required!",
                  })}
                />
                {errors.smtp_port_no && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.smtp_port_no.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="username" className="text-sm">
                  SMTP Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "Username is required!",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* SMTP Password */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="password" className="text-sm">
                  SMTP Password
                </label>
                <input
                  type="text"
                  id="password"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.password.message}
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
                  onClick={() => {
                    handleComponentView("listing");
                    setCreatedUserId(null);
                    handleTabClick("basic_details");
                  }}
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

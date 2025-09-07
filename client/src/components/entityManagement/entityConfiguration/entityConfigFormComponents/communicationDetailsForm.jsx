import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";
import {
  createEntity,
  updateEntity,
} from "../../../../services/entityManagement_services/service";

export const EntityCommunicationDetailsForm = () => {
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
              {/* Email Domain */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="email_domain" className="text-sm">
                  Email Domain
                </label>
                <input
                  type="text"
                  id="email_domain"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter email domain"
                  {...register("email_domain", {
                    required: "Email domain is required!",
                  })}
                />
                {errors.email_domain && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.email_domain.message}
                  </p>
                )}
              </div>

              {/* Email Signature */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="email_signature" className="text-sm">
                  Email Signature
                </label>
                <input
                  type="text"
                  id="email_signature"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter email signature"
                  {...register("email_signature", {
                    required: "Email signature is required!",
                  })}
                />
                {errors.email_signature && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.email_signature.message}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact_country_code" className="text-sm">
                    Contact No.
                  </label>
                  <div className="flex">
                    <Controller
                      name="contact_country_code"
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
                  {errors.contact_country_code && errors.contact_no ? (
                    <p className="text-red-500 text-[.7rem]">
                      Both country code and contact number are required!
                    </p>
                  ) : errors.contact_country_code ? (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.contact_country_code.message}
                    </p>
                  ) : errors.contact_no ? (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.contact_no.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Default Time Zone */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="default_time_zone" className="text-sm">
                  Default Time Zone
                </label>
                <input
                  type="text"
                  id="default_time_zone"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter default timezone"
                  {...register("default_time_zone")}
                />
              </div>

              {/* Business Hours */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="business_hours" className="text-sm">
                  Business Hours
                </label>
                <input
                  type="text"
                  id="business_hours"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter business hours"
                  {...register("business_hours")}
                />
              </div>

              {/* Local Currency */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="local_currency" className="text-sm">
                  Local Currency
                </label>
                <input
                  type="text"
                  id="local_currency"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter local currency"
                  {...register("local_currency")}
                />
              </div>
            </div>

            {/* Row-3 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Tax Info */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="tax_info" className="text-sm">
                  Tax/Vat Number
                </label>
                <input
                  type="text"
                  id="tax_info"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter tax/vat number"
                  {...register("tax_info", {
                    required: "Tax number is required!",
                  })}
                />
                {errors.tax_info && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.tax_info.message}
                  </p>
                )}
              </div>

              {/* Language Prefference */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="language_preference" className="text-sm">
                  Preffered Language
                </label>
                <input
                  type="text"
                  id="language_preference"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter preffered language"
                  {...register("language_preference", {
                    required: "Preffered language is required!",
                  })}
                />
                {errors.language_preference && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.language_preference.message}
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

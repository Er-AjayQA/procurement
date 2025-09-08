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
      email_domain: "",
      email_signature: "",
      contact_country_code: "",
      contact_no: "",
      default_time_zone: "",
      business_hours: "",
      local_currency: "",
      tax_info: "",
      language_preference: "",
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
    currencyOptions,
    formSelectStyles,
    createdEntityId,
    setCreatedEntityId,
  } = useEntityConfigContext();

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data && countryCodeOptions.length > 0) {
      const setUpdateDefaultData = () => {
        setValue("email_domain", data?.email_domain);
        setValue("email_signature", data?.email_signature);
        setValue("contact_country_code", data?.contact_country_code);
        setValue("contact_no", data?.contact_no);
        setValue("default_time_zone", data?.default_time_zone);
        setValue("business_hours", data?.business_hours);
        setValue("local_currency", data?.local_currency);
        setValue("tax_info", data?.tax_info);
        setValue("language_preference", data?.language_preference);

        if (data?.contact_country_code) {
          const option = countryCodeOptions?.find(
            (item) => item.value == data.contact_country_code
          );

          if (option) {
            setValue("contact_country_code", option.value);
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
        entity_id: createdEntityId,
        email_domain: formData?.email_domain,
        email_signature: formData?.email_signature,
        contact_country_code: formData?.contact_country_code,
        contact_no: formData?.contact_no,
        default_time_zone: formData?.default_time_zone,
        business_hours: formData?.business_hours,
        local_currency: formData?.local_currency,
        tax_info: formData?.tax_info,
        language_preference: formData?.language_preference,
      };

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        response = await createEntity(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("regional_details");
        getAllData();
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
                <Controller
                  name="local_currency"
                  control={control}
                  rules={{ required: "Local currency is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={currencyOptions}
                      value={findSelectedOption(currencyOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select currency..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.local_currency && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.local_currency.message}
                  </p>
                )}
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

              {/* Language Preferred */}
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
                    setCreatedEntityId(null);
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

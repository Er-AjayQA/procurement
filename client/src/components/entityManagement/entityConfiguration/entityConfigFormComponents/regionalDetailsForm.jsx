import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";
import {
  createEntity,
  updateEntity,
} from "../../../../services/entityManagement_services/service";

export const EntityRegionalDetailsForm = () => {
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
      date_format: "",
      time_format: "",
      date_time_format: "",
      thousand_separator: "",
      decimal_separator: "",
      currency_symbol: "",
      currency_symbol_position: "",
      number_of_decimal: "",
    },
  });

  const {
    data,
    getAllData,
    updateId,
    tabType,
    setCreatedUserId,
    handleTabClick,
    handleComponentView,
    formSelectStyles,
    bankOptions,
    separatorOptions,
    currencyPositionOptions,
    datesFormatOptions,
    timeFormatOptions,
    currencySymbolOptions,
    createdEntityId,
    setCreatedEntityId,
  } = useEntityConfigContext();

  const [isLoading, setIsLoading] = useState(false);

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      const setUpdateDefaultData = async () => {
        setValue("date_format", data?.date_format);
        setValue("time_format", data?.time_format);
        setValue("date_time_format", data?.date_time_format);
        setValue("thousand_separator", data?.thousand_separator);
        setValue("decimal_separator", data?.decimal_separator);
        setValue("currency_symbol", data?.currency_symbol);
        setValue("currency_symbol_position", data?.currency_symbol_position);
        setValue("number_of_decimal", data?.number_of_decimal);
      };

      setUpdateDefaultData();
    }
  }, [updateId, data, setValue, bankOptions]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const payload = {
        tab_type: tabType,
        date_format: formData?.date_format,
        time_format: formData?.time_format,
        date_time_format: formData?.date_time_format,
        thousand_separator: formData?.thousand_separator,
        decimal_separator: formData?.decimal_separator,
        currency_symbol: formData?.currency_symbol,
        currency_symbol_position: formData?.currency_symbol_position,
        number_of_decimal: formData?.number_of_decimal,
      };

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        payload.entity_id = createdEntityId;
        response = await createEntity(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("basic_details");
        handleComponentView("listing");
        setCreatedEntityId(null);
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
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
              {/* Preferred Date Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="date_format" className="text-sm">
                  Preferred Date Format
                </label>
                <Controller
                  name="date_format"
                  control={control}
                  rules={{ required: "Date format is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={datesFormatOptions}
                      value={findSelectedOption(
                        datesFormatOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select date format..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.date_format && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.date_format.message}
                  </p>
                )}
              </div>

              {/* Preferred Time Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="time_format" className="text-sm">
                  Preferred Time Format
                </label>
                <Controller
                  name="time_format"
                  control={control}
                  rules={{ required: "Time format is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={timeFormatOptions}
                      value={findSelectedOption(timeFormatOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select time format..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.time_format && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.time_format.message}
                  </p>
                )}
              </div>

              {/* Preferred Date Time Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="date_time_format" className="text-sm">
                  Preferred DateTime Format
                </label>
                <input
                  type="text"
                  id="date_time_format"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter date time format..."
                  {...register("date_time_format", {
                    required: "Date time format is required!",
                  })}
                />
                {errors.date_time_format && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.date_time_format.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Preferred Thousand Separator */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="thousand_separator" className="text-sm">
                  Thousand Separator
                </label>
                <Controller
                  name="thousand_separator"
                  control={control}
                  rules={{ required: "Thousand separator is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={separatorOptions}
                      value={findSelectedOption(separatorOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select thousand separator..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.thousand_separator && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.thousand_separator.message}
                  </p>
                )}
              </div>

              {/* Preferred Decimal Separator */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="decimal_separator" className="text-sm">
                  Decimal Separator
                </label>
                <Controller
                  name="decimal_separator"
                  control={control}
                  rules={{ required: "Decimal separator is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={separatorOptions}
                      value={findSelectedOption(separatorOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select decimal separator..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.decimal_separator && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.decimal_separator.message}
                  </p>
                )}
              </div>

              {/* Currency Symbol */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="currency_symbol" className="text-sm">
                  Currency Symbol
                </label>
                <Controller
                  name="currency_symbol"
                  control={control}
                  rules={{ required: "Currency symbol is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={currencySymbolOptions}
                      value={findSelectedOption(
                        currencySymbolOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select currency symbol..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.currency_symbol && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.currency_symbol.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-3 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Currency Symbol Position */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="currency_symbol_position" className="text-sm">
                  Currency Symbol Position
                </label>
                <Controller
                  name="currency_symbol_position"
                  control={control}
                  rules={{ required: "Symbol position is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={currencyPositionOptions}
                      value={findSelectedOption(
                        currencyPositionOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select symbol position..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.currency_symbol_position && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.currency_symbol_position.message}
                  </p>
                )}
              </div>

              {/* Number of Decimal */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="number_of_decimal" className="text-sm">
                  No. of Decimals
                </label>
                <input
                  type="number"
                  id="number_of_decimal"
                  min={0}
                  defaultValue={0}
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter number of decimals..."
                  {...register("number_of_decimal", {
                    required: "Decimal numbers is required!",
                  })}
                />
                {errors.number_of_decimal && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.number_of_decimal.message}
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
                    handleTabClick("basic_details");
                    setCreatedUserId(null);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
                  disabled={isLoading}
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

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
      bank_id: "",
      account_holder_name: "",
      bank_address: "",
      account_number: "",
      re_account_number: "",
      nuit_number: "",
      inss_number: "",
      nib_number: "",
    },
  });

  const {
    data,
    getAllData,
    updateId,
    tabType,
    createdUserId,
    setCreatedUserId,
    handleTabClick,
    handleComponentView,
    formSelectStyles,
    bankOptions,
    separatorOptions,
    currencyPositionOptions,
  } = useEntityConfigContext();

  const [isLoading, setIsLoading] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [isBankOptionsLoaded, setIsBankOptionsLoaded] = useState(false);
  const accountNumber = watch("account_number");
  const reAccountNumber = watch("re_account_number");

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data && bankOptions.length > 0) {
      const setUpdateDefaultData = async () => {
        setValue("account_holder_name", data?.account_holder_name);
        setValue("bank_address", data?.bank_address);
        setValue("account_number", data?.account_number);
        setValue("re_account_number", data?.re_account_number);
        setValue("nuit_number", data?.nuit_number);
        setValue("inss_number", data?.inss_number);
        setValue("nib_number", data?.nib_number);

        setIsBankOptionsLoaded(true);
      };

      const bankOption = bankOptions?.find(
        (item) => item.value == data?.bank_id
      );

      if (bankOption) {
        setValue("bank_id", bankOption.value);
      }

      setUpdateDefaultData();
    }
  }, [updateId, data, setValue, bankOptions]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      if (formData.account_number !== formData.re_account_number) {
        toast.error("Account no. & Re-Account no. must match!");
        setAccountNumberError(true);
        return;
      }

      setIsLoading(true);

      const payload = {
        tab_type: tabType,
        bank_id: formData?.bank_id,
        account_holder_name: formData?.account_holder_name,
        bank_address: formData?.bank_address,
        account_number: formData?.account_number.toString(),
        re_account_number: formData?.re_account_number.toString(),
        nuit_number: formData?.nuit_number,
        inss_number: formData?.inss_number,
        nib_number: formData?.nib_number,
      };

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        payload.user_id = createdUserId;
        response = await createEntity(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("document_details");
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

  // Handling Account & Re-Account number error on fields value change
  useEffect(() => {
    if (accountNumber && reAccountNumber) {
      if (accountNumber !== reAccountNumber) {
        setAccountNumberError(true);
      } else {
        setAccountNumberError(false);
      }
    } else {
      setAccountNumberError(false);
    }
  }, [accountNumber, reAccountNumber]);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3 flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Row-1 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Preffered Date Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="date_format" className="text-sm">
                  Preffered Date Format
                </label>
                <input
                  type="text"
                  id="date_format"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter preffered date format..."
                  {...register("date_format", {
                    required: "Date format is required!",
                  })}
                />
                {errors.date_format && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.date_format.message}
                  </p>
                )}
              </div>

              {/* Preffered Time Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="time_format" className="text-sm">
                  Preffered Time Format
                </label>
                <input
                  type="text"
                  id="time_format"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter preffered time format..."
                  {...register("time_format", {
                    required: "Time format is required!",
                  })}
                />
                {errors.time_format && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.time_format.message}
                  </p>
                )}
              </div>

              {/* Preffered Date Time Format */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="date_time_format" className="text-sm">
                  Preffered DateTime Format
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
              {/* Preffered Thousand Separator */}
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

              {/* Preffered Decimal Separator */}
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
                <input
                  type="text"
                  id="currency_symbol"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter currency symbol..."
                  {...register("currency_symbol", {
                    required: "Currency symbol is required!",
                  })}
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
                      placeholder="Symbol position separator..."
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
                  type="text"
                  id="number_of_decimal"
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

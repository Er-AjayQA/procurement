import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";

export const EmployeePaymentDetailsForm = () => {
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
  } = useEmployeeContext();

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
        response = await updateEmployee(updateId, payload);
      } else {
        payload.user_id = createdUserId;
        response = await createEmployee(payload);
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
              {/* Bank Name */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="bank_id" className="text-sm">
                  Bank Name
                </label>
                <Controller
                  name="bank_id"
                  control={control}
                  rules={{ required: "Bank is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={bankOptions}
                      value={findSelectedOption(bankOptions, field.value)}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select title..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                      isLoading={!isBankOptionsLoaded && updateId}
                    />
                  )}
                />
                {errors.bank_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.bank_id.message}
                  </p>
                )}
              </div>

              {/* Account Holder Name */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="account_holder_name" className="text-sm">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="account_holder_name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter account holder name..."
                  {...register("account_holder_name", {
                    required: "Account holder name is required!",
                  })}
                />
                {errors.account_holder_name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.account_holder_name.message}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="account_number" className="text-sm">
                  Account No.
                </label>
                <input
                  type="text"
                  id="account_number"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover ${
                    accountNumberError
                      ? "border-red-500 hover:border-red-600"
                      : ""
                  }`}
                  placeholder="Enter account number..."
                  {...register("account_number", {
                    required: "Account number is required!",
                  })}
                />
                {errors.account_number && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.account_number.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Re-Account Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="re_account_number" className="text-sm">
                  Re-Account No.
                </label>
                <input
                  type="text"
                  id="re_account_number"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover ${
                    accountNumberError
                      ? "border-red-500 hover:border-red-600"
                      : ""
                  }`}
                  placeholder="Enter re-account number..."
                  {...register("re_account_number", {
                    required: "Re-Account number is required!",
                  })}
                />
                {errors.re_account_number && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.re_account_number.message}
                  </p>
                )}
              </div>

              {/* NUIT Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="nuit_number" className="text-sm">
                  NUIT No.
                </label>
                <input
                  type="number"
                  id="nuit_number"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter nuit number..."
                  {...register("nuit_number", {
                    required: "NUIT number is required!",
                  })}
                />
                {errors.nuit_number && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.nuit_number.message}
                  </p>
                )}
              </div>

              {/* INSS Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="inss_number" className="text-sm">
                  INSS No.
                </label>
                <input
                  type="number"
                  id="inss_number"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter inss number..."
                  {...register("inss_number")}
                />
              </div>
            </div>

            {/* Row-3 */}
            <div className="grid grid-cols-12 gap-5">
              {/* NIB Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="nib_number" className="text-sm">
                  NIB No.
                </label>
                <input
                  type="number"
                  id="nib_number"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter nib number..."
                  {...register("nib_number")}
                />
              </div>

              {/* Bank Address Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="bank_address" className="text-sm">
                  Bank Address
                </label>
                <textarea
                  name="bank_address"
                  id="bank_address"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter bank address..."
                  {...register("bank_address", {
                    required: "Bank address is required!",
                  })}
                />
                {errors.bank_address && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.bank_address.message}
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

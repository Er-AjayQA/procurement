import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";

export const EmployeeContractDetailsForm = () => {
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
      contract_type_id: "",
      start_working_date: "",
      probation_end_date: "",
      notice_period_days: "",
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
    contractTypesOptions,
    setContractTypesOptions,
    setCountryCodeOptions,
    setCountryListOptions,
    setReportingManagerOptions,
    setShiftOptions,
    setDepartmentOptions,
    setDesignationOptions,
    setEmployeeTypeOptions,
    setAreaOptions,
    setBranchOptions,
    setAllowancesOptions,
    setBankOptions,
  } = useEmployeeContext();

  const [isLoading, setIsLoading] = useState(false);
  const [datesError, setDatesError] = useState(false);

  const startDate = watch("start_working_date");
  const endDate = watch("probation_end_date");

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data && contractTypesOptions.length > 0) {
      const setUpdateDefaultData = async () => {
        setValue("bank_address", data?.bank_address);
        setValue("start_working_date", data?.start_working_date);
        setValue("probation_end_date", data?.probation_end_date);
        setValue("notice_period_days", data?.notice_period_days);
      };

      const contractOption = contractTypesOptions?.find(
        (item) => item.value == data?.contract_type_id
      );

      if (contractOption) {
        setValue("contract_type_id", contractOption.value);
      }

      setUpdateDefaultData();
    }
  }, [updateId, data, setValue, contractTypesOptions]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      if (formData?.start_working_date >= formData?.probation_end_date) {
        toast.error(
          "Start Working-Date must be earlier than Probation End-Date!"
        );
        setDatesError(true);
        return;
      }

      setIsLoading(true);

      const payload = {
        tab_type: tabType,
        contract_type_id: formData?.contract_type_id,
        start_working_date: formData?.start_working_date,
        probation_end_date: formData?.probation_end_date,
        notice_period_days: formData?.notice_period_days,
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
        handleTabClick("basic_details");
        handleComponentView("listing");
        setCreatedUserId(null);
        setContractTypesOptions([]);
        setCountryCodeOptions([]);
        setCountryListOptions([]);
        setReportingManagerOptions([]);
        setShiftOptions([]);
        setDepartmentOptions([]);
        setDesignationOptions([]);
        setEmployeeTypeOptions([]);
        setAreaOptions([]);
        setBranchOptions([]);
        setAllowancesOptions([]);
        setBankOptions([]);
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

  // Validate dates whenever they change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        setDatesError(true);
      } else {
        setDatesError(false);
      }
    } else {
      setDatesError(false);
    }
  }, [startDate, endDate]);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3 flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Row-1 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Contract Type */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="contract_type_id" className="text-sm">
                  Contract Type
                </label>
                <Controller
                  name="contract_type_id"
                  control={control}
                  rules={{ required: "Contract type is required!" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={contractTypesOptions}
                      value={findSelectedOption(
                        contractTypesOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="Select contract type..."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={formSelectStyles}
                    />
                  )}
                />
                {errors.contract_type_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.contract_type_id.message}
                  </p>
                )}
              </div>

              {/* Start Working Date */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="start_working_date" className="text-sm">
                  Start Working Date
                </label>
                <input
                  type="date"
                  id="start_working_date"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover ${
                    datesError ? "border-red-600" : ""
                  }`}
                  placeholder="Enter start working date..."
                  {...register("start_working_date", {
                    required: "Start working date is required!",
                  })}
                />
                {errors.start_working_date && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.start_working_date.message}
                  </p>
                )}
              </div>

              {/* Probation End Date */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="probation_end_date" className="text-sm">
                  Probation End Date
                </label>
                <input
                  type="date"
                  id="probation_end_date"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover ${
                    datesError ? "border-red-600" : ""
                  }`}
                  placeholder="Enter probation end date..."
                  {...register("probation_end_date", {
                    required: "Probation end date is required!",
                  })}
                />
                {errors.probation_end_date && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.probation_end_date.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Notice Period Days */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="notice_period_days" className="text-sm">
                  Notice Period Days
                </label>
                <input
                  type="number"
                  id="notice_period_days"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                  placeholder="Enter notice period..."
                  {...register("notice_period_days", {
                    required: "Notice period is required!",
                  })}
                />
                {errors.notice_period_days && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.notice_period_days.message}
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
                  {updateId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

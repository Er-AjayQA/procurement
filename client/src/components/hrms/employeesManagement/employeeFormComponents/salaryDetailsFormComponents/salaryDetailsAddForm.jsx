import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getShiftById } from "../../../../../services/master_services/service";
import { toast } from "react-toastify";

export const SalaryDetailsAddForm = ({
  control,
  errors,
  watch,
  setValue,
  register,
  shiftOptions,
  findSelectedOption,
  formSelectStyles,
  baseSalaryError,
  setBaseSalaryError,
}) => {
  const [selectedShift, setSelectedShift] = useState(null);
  const [shiftDetails, setShiftDetails] = useState(null);

  const baseSalary = watch("base_salary");
  const dailyWorkingHours = watch("daily_working_hours");

  // Get Shift Details
  const getShiftDetails = async (id) => {
    try {
      const response = await getShiftById(id);

      if (response.success) {
        setShiftDetails(response?.data[0]);
        setValue("daily_working_hours", response?.data[0].shift_duration);
        setValue("weekly_hours", response?.data[0].shift_duration * 5);
        setValue(
          "total_monthly_hours",
          response?.data[0].working_hours_per_month
        );
        calculateSalaries(baseSalary, response.data[0].shift_duration);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setShiftDetails(null);
    }
  };

  // Calculate Salaries
  const calculateSalaries = (baseSalary, shiftDuration) => {
    const base = parseFloat(baseSalary);
    const hours = parseFloat(shiftDuration);

    if (!isNaN(base) && !isNaN(hours) && hours > 0) {
      const salaryPerDay = base / 30;
      const salaryPerHour = salaryPerDay / hours;
      setValue("salary_per_day", salaryPerDay.toFixed(2));
      setValue("salary_per_hour", salaryPerHour.toFixed(2));
    } else {
      setValue("salary_per_day", "");
      setValue("salary_per_hour", "");
    }
  };

  // Handle base salary change
  const handleBaseSalaryChange = (e) => {
    const value = e.target.value;
    setValue("base_salary", value);
    calculateSalaries(value, dailyWorkingHours);
  };

  useEffect(() => {
    if (baseSalary && baseSalary < 0) {
      toast.error("Base salary can't be less than 0.");
      setBaseSalaryError(true);
    }

    setBaseSalaryError(false);

    calculateSalaries(baseSalary, dailyWorkingHours);
  }, [baseSalary, dailyWorkingHours, setValue]);

  // Getting Shift Details on selecting Shift
  useEffect(() => {
    if (selectedShift) {
      getShiftDetails(selectedShift);
    }
  }, [selectedShift]);

  // clear auto patch fields on changing the selecting shift type
  useEffect(() => {
    if (selectedShift) {
      getShiftDetails(selectedShift);
    } else {
      // Clear shift-related fields when no shift is selected
      setShiftDetails(null);
      setValue("daily_working_hours", "");
      setValue("weekly_hours", "");
      setValue("total_monthly_hours", "");
      setValue("base_salary", "");
      calculateSalaries(baseSalary, null);
    }
  }, [selectedShift]);

  return (
    <>
      {/* Salary Details */}
      <div className="shadow-lg rounded-md">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Salary Details</h3>
        </div>
        <div className="flex py-5 px-3 flex-col gap-5">
          {/* Row-1 */}
          <div className="grid grid-cols-12 gap-5">
            {/* Shift */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="shift_id" className="text-sm">
                  Shift
                </label>
                <Controller
                  name="shift_id"
                  control={control}
                  rules={{ required: "Shift type is required!" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={shiftOptions || []}
                      value={findSelectedOption(shiftOptions, field.value)}
                      onChange={(selected) => {
                        field.onChange(selected?.value || "");
                        setSelectedShift(selected?.value);
                      }}
                      placeholder="Select shift..."
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
                {errors.shift_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.shift_id.message}
                  </p>
                )}
              </div>
            </div>

            {/*  Base Salary */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="base_salary" className="text-sm">
                  Base Salary
                </label>
                <input
                  type="number"
                  id="base_salary"
                  onChange={handleBaseSalaryChange}
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover ${
                    baseSalaryError ? "border-red-500 hover:border-red-600" : ""
                  }`}
                  placeholder="Enter base salary..."
                  {...register("base_salary", {
                    required: "Base salary is required!",
                  })}
                />
                {errors.base_salary && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.base_salary.message}
                  </p>
                )}
              </div>
            </div>

            {/*  Daily Working Hours */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="daily_working_hours" className="text-sm">
                  Daily Working Hours
                </label>
                <input
                  type="number"
                  id="daily_working_hours"
                  readOnly
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter daily working hours..."
                  {...register("daily_working_hours")}
                />
              </div>
            </div>

            {/*  Salary Per Day */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="salary_per_day" className="text-sm">
                  Salary Per Day
                </label>
                <input
                  type="number"
                  id="salary_per_day"
                  readOnly
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter salary per day..."
                  {...register("salary_per_day")}
                />
              </div>
            </div>

            {/*  Salary Per Hour */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="salary_per_hour" className="text-sm">
                  Salary Per Hour
                </label>
                <input
                  type="number"
                  id="salary_per_hour"
                  readOnly
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter salary per hour..."
                  {...register("salary_per_hour")}
                />
              </div>
            </div>

            {/*  Total Monthly Hours */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="total_monthly_hours" className="text-sm">
                  Total Monthly Hour
                </label>
                <input
                  type="number"
                  id="total_monthly_hours"
                  readOnly
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter total monthly hours..."
                  {...register("total_monthly_hours")}
                />
              </div>
            </div>

            {/*  Weekly Hours */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekly_hours" className="text-sm">
                  Weekly Hour
                </label>
                <input
                  type="number"
                  id="weekly_hours"
                  readOnly
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter weekly hours..."
                  {...register("weekly_hours")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

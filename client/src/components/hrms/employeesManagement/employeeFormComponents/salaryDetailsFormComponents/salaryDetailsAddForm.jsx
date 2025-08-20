import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getShiftById } from "../../../../../services/master_services/service";
import { toast } from "react-toastify";

export const SalaryDetailsAddForm = ({
  control,
  errors,
  setValue,
  register,
  shiftOptions,
  findSelectedOption,
  formSelectStyles,
}) => {
  const [selectedShift, setSelectedShift] = useState(null);
  const [shiftDetails, setShiftDetails] = useState(null);

  // Get Shift Details
  const getShiftDetails = async (id) => {
    try {
      const response = await getShiftById(id);

      if (response.success) {
        setShiftDetails(response?.data[0]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setShiftDetails(null);
    }
  };

  useEffect(() => {
    if (selectedShift) {
      getShiftDetails(selectedShift);
    }
  }, [selectedShift]);

  useEffect(() => {
    if (selectedShift === undefined) {
      setValue("daily_working_hours", "");
    }
  }, [selectedShift]);

  console.log("Shift Details=====>", shiftDetails);

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
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter base salary..."
                  {...register("base_salary")}
                />
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
                  value={shiftDetails?.shift_duration}
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
                  value={shiftDetails?.working_hours_per_month}
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

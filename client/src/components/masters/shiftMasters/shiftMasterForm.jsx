import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createShift,
  updateShift,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import { useShiftMasterContext } from "../../../contextApis/useMastersContextFile";

export const ShiftMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useShiftMasterContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      defaultValues: {
        name: "",
        start_time: "",
        end_time: "",
        shift_duration: "",
        sites: "",
        off_days: "",
        working_hours_per_month: "",
        working_days_per_month: "",
        observations: "",
      },
    },
  });

  // Watch the relevant fields for changes
  const watchStartTime = watch("start_time");
  const watchEndTime = watch("end_time");
  const watchOffDays = watch("off_days");

  // Calculate time difference in hours
  const calculateTimeDifference = useCallback((start, end) => {
    if (!start || !end) return 0;

    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    // Handle overnight shifts (end time is next day)
    let hoursDiff = endHours - startHours;
    if (hoursDiff < 0) {
      hoursDiff += 24;
    }

    const minutesDiff = endMinutes - startMinutes;
    const totalHours = hoursDiff + minutesDiff / 60;

    return Math.round(totalHours * 100) / 100; // Round to 2 decimal places
  }, []);

  // Calculate working hours/month
  const calculateWorkingHours = useCallback((offDays, shiftDuration) => {
    if (!offDays || !shiftDuration) return 0;
    const totalWorkingDays = 30 - Number(offDays);
    return Math.round(totalWorkingDays * shiftDuration * 100) / 100;
  }, []);

  // Calculate working days/month
  const calculateWorkingDays = useCallback((offDays) => {
    if (!offDays) return 0;
    return 30 - Number(offDays);
  }, []);

  // Effect to update calculated fields when inputs change
  useEffect(() => {
    const shiftDuration = calculateTimeDifference(watchStartTime, watchEndTime);
    setValue("shift_duration", shiftDuration);

    const workingDays = calculateWorkingDays(watchOffDays);
    setValue("working_days_per_month", workingDays);

    const workingHours = calculateWorkingHours(watchOffDays, shiftDuration);
    setValue("working_hours_per_month", workingHours);
  }, [
    watchStartTime,
    watchEndTime,
    watchOffDays,
    calculateTimeDifference,
    calculateWorkingHours,
    calculateWorkingDays,
    setValue,
  ]);

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        name: data.name || data[0]?.name || "",
        start_time: data.start_time || data[0]?.start_time || "",
        end_time: data.end_time || data[0]?.end_time || "",
        shift_duration: data.shift_duration || data[0]?.shift_duration || "",
        sites: data.sites || data[0]?.sites || "",
        off_days: data.off_days || data[0]?.off_days || "",
        working_hours_per_month:
          data.working_hours_per_month ||
          data[0]?.working_hours_per_month ||
          "",
        working_days_per_month:
          data.working_days_per_month || data[0]?.working_days_per_month || "",
        observations: data.observations || data[0]?.observations || "",
      });
    } else {
      reset({
        name: "",
        start_time: "",
        end_time: "",
        shift_duration: "",
        sites: "",
        off_days: "",
        working_hours_per_month: "",
        working_days_per_month: "",
        observations: "",
      });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      name: "",
      start_time: "",
      end_time: "",
      shift_duration: "",
      sites: "",
      off_days: "",
      working_hours_per_month: "",
      observations: "",
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name || "",
        start_time: formData.start_time || "",
        end_time: formData.end_time || "",
        shift_duration: formData.shift_duration || "",
        sites: formData.sites || "",
        off_days: formData.off_days || "",
        working_hours_per_month: formData.working_hours_per_month || "",
        working_days_per_month: formData.working_days_per_month || "",
        observations: formData.observations || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateShift(updateId, payload);
      } else {
        response = await createShift(payload);
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Shift" : "Update Shift"}
          </h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={onClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-full mx-auto p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
              {/* Row 1 */}
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter shift name"
                    {...register("name", {
                      required: "Shift Name is required!",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="start_time" className="text-sm">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="start_time"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter start timing"
                    {...register("start_time", {
                      required: "Start-Time is required!",
                    })}
                  />
                  {errors.start_time && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.start_time.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="end_time" className="text-sm">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="end_time"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter end timing"
                    {...register("end_time", {
                      required: "End-Time is required!",
                    })}
                  />
                  {errors.end_time && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.end_time.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="shift_duration" className="text-sm">
                    Shift Duration
                  </label>
                  <input
                    type="number"
                    id="shift_duration"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter duration"
                    readOnly
                    {...register("shift_duration")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="sites" className="text-sm">
                    Sites
                  </label>
                  <input
                    type="text"
                    id="sites"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter site"
                    {...register("sites")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="off_days" className="text-sm">
                    Off-Days/Month
                  </label>
                  <input
                    type="number"
                    id="off_days"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter off-days"
                    {...register("off_days")}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="working_hours_per_month" className="text-sm">
                    Working Hours/Month
                  </label>
                  <input
                    type="number"
                    id="working_hours_per_month"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter working hours"
                    readOnly
                    {...register("working_hours_per_month")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="working_days_per_month" className="text-sm">
                    Working Days/Month
                  </label>
                  <input
                    type="number"
                    id="working_days_per_month"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter working days"
                    readOnly
                    {...register("working_days_per_month")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="observations" className="text-sm">
                    Observations
                  </label>
                  <input
                    type="text"
                    id="observations"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter observations"
                    {...register("observations")}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover">
                {formType === "Add" ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

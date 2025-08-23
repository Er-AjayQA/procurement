import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { AddButton } from "../../../../UI/addButtonUi";

export const PreviousEmployerDetailsAddItem = ({
  isVisible,
  onClose,
  onAddNewRow,
  onUpdateRow,
  updateData,
  updateIndex,
  setUpdateIndex,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_name: "",
      from_date: "",
      to_date: "",
      last_drawn_salary: "",
      location: "",
      reason_of_leaving: "",
    },
  });

  useEffect(() => {
    if (updateData) {
      setValue("company_name", updateData?.company_name);
      setValue("from_date", updateData?.from_date);
      setValue("to_date", updateData?.to_date);
      setValue("last_drawn_salary", updateData?.last_drawn_salary);
      setValue("location", updateData?.location);
      setValue("reason_of_leaving", updateData?.reason_of_leaving);
    } else {
      reset({
        company_name: "",
        from_date: "",
        to_date: "",
        last_drawn_salary: "",
        location: "",
        reason_of_leaving: "",
      });
    }
  }, [updateData, reset, setValue]);

  const onSubmit = (data, e) => {
    e.preventDefault();

    const previousEmployerData = {
      company_name: data?.company_name,
      from_date: data?.from_date,
      to_date: data?.to_date,
      last_drawn_salary: data?.last_drawn_salary,
      location: data?.location,
      reason_of_leaving: data?.reason_of_leaving,
    };

    if (updateData) {
      onUpdateRow(previousEmployerData, updateIndex);
      setUpdateIndex(null);
    } else {
      onAddNewRow(previousEmployerData);
    }

    reset();
    onClose();
  };

  // Handle Form Reset
  const handleFormReset = () => {
    onClose();
    reset({
      company_name: "",
      from_date: "",
      to_date: "",
      last_drawn_salary: "",
      location: "",
      reason_of_leaving: "",
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-[#0202025b] ${
          isVisible ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            Add Previous Employers Details
          </h3>
          <div
            onClick={() => handleFormReset()}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="company_name"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter company name..."
                {...register("company_name", {
                  required: "Company name is required",
                })}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company_name.message}
                </p>
              )}
            </div>

            {/* From Date */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="from_date"
              >
                From Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="from_date"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter from date..."
                {...register("from_date", {
                  required: "From date is required",
                })}
              />
              {errors.from_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.from_date.message}
                </p>
              )}
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="to_date"
              >
                To Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="to_date"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter to date..."
                {...register("to_date", {
                  required: "To date is required",
                })}
              />
              {errors.to_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.to_date.message}
                </p>
              )}
            </div>

            {/* Last Drawn Salary */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="last_drawn_salary"
              >
                Last Drawn Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_drawn_salary"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter last drawn salary..."
                {...register("last_drawn_salary", {
                  required: "Last drawn salary is required",
                })}
              />
              {errors.last_drawn_salary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_drawn_salary.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="location"
              >
                Location<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter location..."
                {...register("location", {
                  required: "Location is required",
                })}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Reason of Leaving */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="reason_of_leaving"
              >
                Reason of Leaving
              </label>
              <textarea
                name="reason_of_leaving"
                id="reason_of_leaving"
                className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter reason of leaving..."
                {...register("reason_of_leaving")}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-button-color hover:bg-button-hover rounded-lg p-2 px-4 text-white text-sm"
              >
                {updateData ? "Update Details" : "Add Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

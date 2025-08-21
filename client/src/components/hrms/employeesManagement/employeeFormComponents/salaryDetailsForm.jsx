import { useForm } from "react-hook-form";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";
import { SalaryDetailsAddForm } from "./salaryDetailsFormComponents/salaryDetailsAddForm";
import { AllowanceDetailsAddItem } from "./salaryDetailsFormComponents/allowanceDetailsAddForm";

export const EmployeeSalaryDetailsForm = () => {
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
      shift_id: "",
      base_salary: "",
      daily_working_hours: "",
      salary_per_day: "",
      salary_per_hour: "",
      total_monthly_hours: "",
      weekly_hours: "",
      allowances: [],
      salary_revision_details: [],
    },
  });

  const {
    data,
    getAllData,
    tabType,
    shiftOptions,
    formSelectStyles,
    handleComponentView,
    createdUserId,
    setCreatedUserId,
    updateId,
    handleTabClick,
  } = useEmployeeContext();

  const [allowanceDetails, setAllowanceDetails] = useState([]);
  const [baseSalaryError, setBaseSalaryError] = useState(false);
  const [allowanceAmountError, setAllowanceAmountError] = useState({});

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  const handleAddAllowance = () => {
    setAllowanceDetails([
      ...allowanceDetails,
      { allowance_id: "", amount: "", id: Date.now() + Math.random() },
    ]);
  };

  const handleAllowanceChange = (id, field, value) => {
    const updated = allowanceDetails.map((item) => {
      if (item.id === id) {
        if (field === "amount") {
          if (value < 0) {
            toast.error("Amount can't be smaller than 0!");
            setAllowanceAmountError((prev) => ({ ...prev, [id]: true }));
            return { ...item, [field]: value };
          } else {
            setAllowanceAmountError((prev) => {
              const newErrors = { ...prev };
              delete newErrors[id];
              return newErrors;
            });
          }
        }
        return { ...item, [field]: value };
      }
      return item;
    });

    setAllowanceDetails(updated);
  };

  const handleRemoveAllowance = (id) => {
    const updated = allowanceDetails.filter((item) => item.id !== id);
    setAllowanceDetails(updated);

    setAllowanceAmountError((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  // Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      if (data?.base_salary < 0) {
        toast.error("Base salary can't be less than 0.");
        setBaseSalaryError(true);
        return;
      }

      const payload = {
        tab_type: tabType,
        user_id: createdUserId,
        shift_id: data?.shift_id,
        base_salary: data?.base_salary,
        daily_working_hours: data?.daily_working_hours,
        salary_per_day: data?.salary_per_day,
        salary_per_hour: data?.salary_per_hour,
        total_monthly_hours: data?.total_monthly_hours,
        weekly_hours: data?.weekly_hours,
        allowances: allowanceDetails,
      };

      let response;

      if (updateId) {
        response = await updateEmployee(updateId, payload);
      } else {
        response = await createEmployee(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("payment_details");
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Salary Details */}
          <SalaryDetailsAddForm
            control={control}
            errors={errors}
            shiftOptions={shiftOptions}
            watch={watch}
            findSelectedOption={findSelectedOption}
            setValue={setValue}
            register={register}
            baseSalaryError={baseSalaryError}
            setBaseSalaryError={setBaseSalaryError}
            formSelectStyles={formSelectStyles}
          />

          {/* Allowance Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
              <h3 className="text-white text-xs">Allowance Details</h3>
              <button
                type="button"
                onClick={() => handleAddAllowance()}
                className="text-white hover:text-gray-200 flex items-center text-xs"
              >
                <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
                Allowance Details
              </button>
            </div>

            {allowanceDetails.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold gap-3">
                  <div className="col-span-3 p-2 text-xs font-bold text-center">
                    S.No
                  </div>
                  <div className="col-span-3 p-2 text-xs font-bold text-center">
                    Allowance Name
                  </div>
                  <div className="col-span-3 p-2 text-xs font-bold text-center">
                    Amount
                  </div>
                  <div className="col-span-3 p-2 text-xs font-bold text-center">
                    Action
                  </div>
                </div>
                {allowanceDetails.map((allowance, index) => (
                  <AllowanceDetailsAddItem
                    key={allowance.id}
                    allowanceDetails={allowanceDetails}
                    allowance={allowance}
                    index={index}
                    allowanceAmountError={allowanceAmountError}
                    onChange={handleAllowanceChange}
                    onRemove={handleRemoveAllowance}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500 border border-gray-200 rounded-md">
                No content added yet
              </div>
            )}
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
        </form>
      </div>
    </>
  );
};

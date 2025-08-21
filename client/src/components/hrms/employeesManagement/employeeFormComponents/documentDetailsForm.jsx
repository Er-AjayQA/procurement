import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";

export const EmployeeDocumentDetailsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
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
  } = useEmployeeContext();

  const [isLoading, setIsLoading] = useState(false);

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      reset({
        bank_id: data?.bank_id || "",
      });
    } else {
      reset({
        bank_id: "",
      });
    }
  }, [updateId, data, reset]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const payload = {
        tab_type: tabType,
        user_id: createdUserId,
        bank_id: formData?.bank_id,
      };

      // let response;
      // if (updateId) {
      //   response = await updateEmployee(updateId, payload);
      // } else {
      //   response = await createEmployee(payload);
      // }
      // if (response.success) {
      //   toast.success(response.message);
      //   handleTabClick("document_details");
      //   getAllData();
      // } else {
      //   toast.error(response.message || "Operation failed");
      // }

      handleTabClick("contract_details");
      getAllData();
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

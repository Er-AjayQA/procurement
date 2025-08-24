import { useEffect, useState } from "react";
import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { useForm } from "react-hook-form";
import { TransferSourceDetailsForm } from "./employeeTransferFormComponents/transferSourceDetailsForm";
import {
  createTransfer,
  updateTransfer,
} from "../../../services/hrms_services/service";
import { toast } from "react-toastify";
import { TransferDestinationDetailsForm } from "./employeeTransferFormComponents/transferDestinationDetailsForm";
import { TransferDetailsForm } from "./employeeTransferFormComponents/transferDetailsForm";
import { useSelector } from "react-redux";

export const EmployeeTransferForm = () => {
  const {
    data,
    updateId,
    handleTabClick,
    tabType,
    getAllData,
    handleComponentView,
  } = useEmployeeTransferContext();

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
      requested_for_user_id: "",
      from_role_id: "",
      from_dept_id: "",
      from_desig_id: "",
      from_branch_id: "",
      current_report_to_user_id: "",
      transfer_type_id: "",
      transfer_reason_id: "",
      applicable_from_date: "",
      applicable_to_date: "",
      detailed_reason: "",
      report_to_user_id: "",
      to_role_id: "",
      to_dept_id: "",
      to_desig_id: "",
      to_branch_id: "",
      new_salary: "",
      requested_by_user_id: "",
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const [requestedUserDetails, setRequestedUserDetails] = useState(null);

  const selectedUser = watch("requested_for_user_id");

  /// Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const payload = {
        requested_for_user_id: data?.requested_for_user_id,
        from_role_id: data?.from_role_id,
        from_dept_id: data?.from_dept_id,
        from_desig_id: data?.from_desig_id,
        from_branch_id: data?.from_branch_id,
        current_report_to_user_id: data?.current_report_to_user_id,
        transfer_type_id: data?.transfer_type_id,
        transfer_reason_id: data?.transfer_reason_id,
        applicable_from_date: data?.applicable_from_date,
        applicable_to_date: data?.applicable_to_date,
        detailed_reason: data?.detailed_reason,
        report_to_user_id: data?.report_to_user_id,
        to_role_id: data?.to_role_id,
        to_dept_id: data?.to_dept_id,
        to_desig_id: data?.to_desig_id,
        to_branch_id: data?.to_branch_id,
        new_salary: data?.new_salary,
        requested_by_user_id: userDetails?.id,
        approval_status: "DRAFT",
      };

      let response;

      if (updateId) {
        response = await updateTransfer(updateId, payload);
      } else {
        response = await createTransfer(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("my_requests");
        handleComponentView("listing");
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="shadow-lg rounded-md h-[80vh] overflow-auto">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Raise Transfer Request</h3>
          </div>

          <div className="p-5">
            <div className="flex flex-col gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-10"
              >
                {/* Source Details */}
                <TransferSourceDetailsForm
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  register={register}
                  reset={reset}
                  watch={watch}
                  selectedUser={selectedUser}
                  findSelectedOption={findSelectedOption}
                />

                {/* Transfer Details */}
                <TransferDetailsForm
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  register={register}
                  reset={reset}
                  watch={watch}
                  selectedUser={selectedUser}
                  findSelectedOption={findSelectedOption}
                />

                {/* Destination Details */}
                <TransferDestinationDetailsForm
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  register={register}
                  reset={reset}
                  watch={watch}
                  selectedUser={selectedUser}
                  findSelectedOption={findSelectedOption}
                />

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center justify-center gap-5">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                      onClick={() => {
                        handleComponentView("listing");
                        handleTabClick("basic_details");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
                    >
                      {updateId ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

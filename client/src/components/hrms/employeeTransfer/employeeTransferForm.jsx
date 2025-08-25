import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";
import { useForm } from "react-hook-form";
import { TransferSourceDetailsForm } from "./employeeTransferFormComponents/transferSourceDetailsForm";
import {
  approvalForTransfer,
  createTransfer,
  updateTransfer,
} from "../../../services/hrms_services/service";
import { toast } from "react-toastify";
import { TransferDestinationDetailsForm } from "./employeeTransferFormComponents/transferDestinationDetailsForm";
import { TransferDetailsForm } from "./employeeTransferFormComponents/transferDetailsForm";
import { useSelector } from "react-redux";
import { TransferApproverActionForm } from "./employeeTransferFormComponents/transferApproverActionForm";
import { useEffect } from "react";

export const EmployeeTransferForm = () => {
  const {
    data,
    tabType,
    updateId,
    handleTabClick,
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
      emp_code: "",
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
      approvers_list: [],
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const selectedUser = watch("requested_for_user_id");

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      const setUpdateDefaultData = () => {
        setValue("requested_for_user_id", data?.requested_for_user_id);
        setValue("emp_code", data?.emp_code);
        setValue("from_role_id", data?.from_role_id);
        setValue("from_dept_id", data?.from_dept_id);
        setValue("from_desig_id", data?.from_desig_id);
        setValue("from_branch_id", data?.from_branch_id);
        setValue("current_report_to_user_id", data?.current_report_to_user_id);
        setValue("transfer_type_id", data?.transfer_type_id);
        setValue("transfer_reason_id", data?.transfer_reason_id);
        setValue("applicable_from_date", data?.applicable_from_date);
        setValue("applicable_to_date", data?.applicable_to_date);
        setValue("detailed_reason", data?.detailed_reason);
        setValue("report_to_user_id", data?.report_to_user_id);
        setValue("to_role_id", data?.to_role_id);
        setValue("to_dept_id", data?.to_dept_id);
        setValue("to_desig_id", data?.to_desig_id);
        setValue("to_branch_id", data?.to_branch_id);
        setValue("new_salary", data?.new_salary);
        setValue("requested_by_user_id", data?.requested_by_user_id);
        setValue("approval_status", "PENDING");
        setValue("approvers_list", data?.approvers_list);
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, setValue]);

  /// Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const payload = {
        requested_for_user_id: data?.requested_for_user_id,
        emp_code: data?.emp_code,
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
        approval_status: "PENDING",
        approvers_list: data?.approvers_list,
      };

      let response;
      if (updateId && tabType.value === "pending_for_approval") {
        payload.user_id = userDetails?.id;
        payload.comments = data?.comments;
        payload.approver_status = data?.approver_status;

        response = await approvalForTransfer(updateId, payload);
      } else if (updateId) {
        response = await updateTransfer(updateId, payload);
      } else {
        response = await createTransfer(payload);
      }
      if (response.success) {
        toast.success(response.message);

        if (tabType === "my_requests") {
          handleTabClick("my_requests");
        }

        if (
          tabType === "pending_for_approval" &&
          data?.approver_status === "APPROVED"
        ) {
          handleTabClick("approved_by_me");
        }

        if (
          tabType === "pending_for_approval" &&
          data?.approver_status === "REJECTED"
        ) {
          handleTabClick("rejected_by_me");
        }

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
        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide">
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

                {/* Destination Details */}
                {updateId && tabType.value === "pending_for_approval" ? (
                  <TransferApproverActionForm
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    register={register}
                    reset={reset}
                    watch={watch}
                    findSelectedOption={findSelectedOption}
                  />
                ) : (
                  ""
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center justify-center gap-5">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
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

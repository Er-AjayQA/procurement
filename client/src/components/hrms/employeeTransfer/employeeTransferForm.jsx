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
    currentTab,
    handleComponentView,
    handleFormClose,
    setUpdateId,
    setData,
    refreshData,
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

  const handleCancel = () => {
    resetForm();
    handleFormClose();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  };

  const resetForm = () => {
    reset({
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
    });
  };

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

        if (data?.workflow_detail && Array.isArray(data.workflow_detail)) {
          // If approvers_list contains objects with value property (react-select format)
          const approversOptions = data.workflow_detail.map((item) => ({
            value: item?.approver_id,
            label: item?.USER_MASTER?.name,
          }));
          setValue("approvers_list", approversOptions);
        } else {
          setValue("approvers_list", []);
        }
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, setValue]);

  // Handle Form Submission
  const onSubmit = async (formData, e) => {
    try {
      e.preventDefault();
      let response;

      // Approval Action
      if (updateId && currentTab === "pending_for_approval") {
        const approvalPayload = {
          user_id: userDetails?.id,
          comments: formData?.comments,
          approver_status: formData?.approver_status,
          acted_on: new Date().toISOString(),
        };

        response = await approvalForTransfer(updateId, approvalPayload);
        if (response.success) {
          toast.success(response.message);

          if (typeof refreshData === "function") {
            refreshData();
          }

          setTimeout(() => {
            if (formData?.approver_status === "APPROVED") {
              handleTabClick({
                name: "Approved by Me",
                value: "approved_by_me",
              });
            } else if (formData?.approver_status === "REJECTED") {
              handleTabClick({
                name: "Rejected by Me",
                value: "rejected_by_me",
              });
            }
            handleComponentView("listing");
          }, 300);

          return;
        } else {
          toast.error(response.message || "Approval action failed");
          return;
        }
      }

      const payload = {
        requested_for_user_id: formData?.requested_for_user_id,
        emp_code: formData?.emp_code,
        from_role_id: formData?.from_role_id,
        from_dept_id: formData?.from_dept_id,
        from_desig_id: formData?.from_desig_id,
        from_branch_id: formData?.from_branch_id,
        current_report_to_user_id: formData?.current_report_to_user_id,
        transfer_type_id: formData?.transfer_type_id,
        transfer_reason_id: formData?.transfer_reason_id,
        applicable_from_date: formData?.applicable_from_date,
        applicable_to_date: formData?.applicable_to_date,
        detailed_reason: formData?.detailed_reason,
        report_to_user_id: formData?.report_to_user_id,
        to_role_id: formData?.to_role_id,
        to_dept_id: formData?.to_dept_id,
        to_desig_id: formData?.to_desig_id,
        to_branch_id: formData?.to_branch_id,
        new_salary: formData?.new_salary,
        requested_by_user_id: userDetails?.id,
        approval_status: "PENDING",
        approvers_list: formData?.approvers_list,
      };

      if (updateId) {
        response = await updateTransfer(updateId, payload);
      } else {
        response = await createTransfer(payload);
      }

      if (response.success) {
        toast.success(response.message);
        if (typeof refreshData === "function") {
          refreshData();
        }

        setTimeout(() => {
          handleComponentView("listing");
          if (currentTab !== "my_requests") {
            handleTabClick({ name: "My Requests", value: "my_requests" });
          }
        }, 300);
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
        <div className="flex justify-end items-center py-3  border-b border-gray-400">
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide py-5">
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
                  selectedUser={selectedUser}
                  findSelectedOption={findSelectedOption}
                />

                {/* Transfer Details */}
                <TransferDetailsForm
                  control={control}
                  errors={errors}
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
                  register={register}
                  reset={reset}
                  findSelectedOption={findSelectedOption}
                />

                {/* Destination Details */}
                {updateId && tabType.value === "pending_for_approval" ? (
                  <TransferApproverActionForm
                    control={control}
                    errors={errors}
                    register={register}
                    reset={reset}
                    findSelectedOption={findSelectedOption}
                  />
                ) : (
                  ""
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center justify-center gap-5">
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                      onClick={handleCancel}
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

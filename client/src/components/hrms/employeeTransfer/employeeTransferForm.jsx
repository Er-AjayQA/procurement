import { useState } from "react";
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

export const EmployeeTransferForm = () => {
  const {
    data,
    updateId,
    userOptions,
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
      transfer_type_id: "",
      transfer_reason_id: "",
      transfer_date: "",
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

  /// Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const payload = {
        tab_type: tabType,
        present_country_id: data?.present_country_id,
        present_state_id: data?.present_state_id,
        present_city_id: data?.present_city_id,
        present_address: data?.present_address,
        permanent_country_id: data?.permanent_country_id,
        permanent_state_id: data?.permanent_state_id,
        permanent_city_id: data?.permanent_city_id,
        permanent_address: data?.permanent_address,
        nationality: data?.nationality,
        personal_state_id: data?.personal_state_id,
        personal_city_id: data?.personal_city_id,
        dire_number: data?.dire_number,
        driving_license: data?.driving_license,
        blood_group: data?.blood_group,
        id_number: data?.id_number,
        id_issue_date: data?.id_issue_date,
        id_exp_date: data?.id_exp_date,
        passport_number: data?.passport_number,
        passport_issue_date: data?.passport_issue_date,
        passport_exp_date: data?.passport_exp_date,
        tax_number: data?.tax_number,
        marital_status: data?.marital_status,
        spouse_name: data?.spouse_name,
      };

      let response;

      if (updateId) {
        response = await updateTransfer(updateId, payload);
      } else {
        response = await createTransfer(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("salary_details");
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

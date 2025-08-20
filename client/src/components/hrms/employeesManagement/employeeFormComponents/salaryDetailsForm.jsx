import { useForm } from "react-hook-form";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
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

  // Watch Input Fields
  const selectedPresentCountry = watch("present_country_id");

  const {
    data,
    getAllData,
    tabType,
    shiftOptions,
    formSelectStyles,
    bloodOptions,
    maritalStatusOptions,
    handleComponentView,
    createdUserId,
    setCreatedUserId,
    updateId,
    handleTabClick,
    allowancesOptions,
  } = useEmployeeContext();

  const [allowanceDetails, setAllowanceDetails] = useState([]);
  const [allowanceFormVisible, setAllowanceFormVisible] = useState(false);
  const [allowanceFormView, setAllowanceFormView] = useState(false);
  const [allowanceViewData, setAllowanceViewData] = useState(null);
  const [allowanceEditData, setAllowanceEditData] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  const handleAddAllowance = () => {
    setAllowanceDetails([
      ...allowanceDetails,
      { allowance_id: "", amount: "" },
    ]);
  };

  const handleAllowanceChange = (index, field, value) => {
    const updated = [...allowanceDetails];

    updated[index][field] = value;
    setAllowanceDetails(updated);
  };

  const handleRemoveAllowance = (index) => {
    const updated = allowanceDetails.filter((_, i) => i !== index);
    setAllowanceDetails(updated);
  };

  // Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const payload = {
        tab_type: tabType,
        user_id: createdUserId,
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
        allowances: allowanceDetails,
        salary_revision_details: allowanceDetails,
      };

      let response;

      if (updateId) {
        response = await updateEmployee(updateId, payload);
      } else {
        response = await createEmployee(payload);
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

  return (
    <>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Salary Details */}
          <SalaryDetailsAddForm
            control={control}
            errors={errors}
            shiftOptions={shiftOptions}
            findSelectedOption={findSelectedOption}
            setValue={setValue}
            register={register}
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
                    key={index}
                    allowanceDetails={allowanceDetails}
                    allowance={allowance}
                    index={index}
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

          {/* Previous Employer Details */}
          {/* <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
              <h3 className="text-white text-xs">Previous Employer Details</h3>
              <button
                type="button"
                onClick={() => setPreviousEmployerFormVisible(true)}
                className="text-white hover:text-gray-200 flex items-center text-xs"
              >
                <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
                Previous Employer Details
              </button>
            </div>

            {previousEmployerDetails?.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-x-auto">
                <div className="min-w-[1500px]">
                  <div className="flex bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
                    <div className="p-2 text-xs font-bold w-[150px] border-e border-e-gray-400 text-center">
                      S.No.
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Company Name
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      From Date
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      To Date
                    </div>
                    <div className="p-2 text-xs font-bold w-[250px] border-e border-e-gray-400 text-center">
                      Last Drawn Salary
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Location
                    </div>
                    <div className="p-2 text-xs font-bold w-[300px] border-e border-e-gray-400 text-center">
                      Reason of Leaving
                    </div>
                    <div className="p-2 text-xs font-bold text-center w-[200px]">
                      Action
                    </div>
                  </div>
                  {previousEmployerDetails.map((employer, index) => (
                    <div key={index} className="flex border-b border-gray-200">
                      <div className="px-2 py-5 text-xs w-[150px] border-e border-e-gray-300 text-center">
                        {index + 1}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.company_name}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.from_date}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.to_date}
                      </div>
                      <div className="px-2 py-5 text-xs w-[250px] border-e border-e-gray-300 text-center">
                        {employer?.last_drawn_salary}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.location}
                      </div>
                      <div className="px-2 py-5 text-xs w-[300px] border-e border-e-gray-300">
                        {employer?.reason_of_leaving}
                      </div>
                      <div className="px-2 py-5 flex justify-center gap-2 w-[200px] text-center">
                        <button
                          type="button"
                          onClick={() => {
                            handlePreviousEmployerViewData(index);
                            setPreviousEmployerFormView(true);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FaEye className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviousEmployerEditData(
                              previousEmployerDetails[index]
                            );
                            setPreviousEmployerFormVisible(true);
                            setUpdateIndex(index);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdEdit className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePreviousEmployerDetailsRemove(index)
                          }
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdDelete className="text-xl w-[15px] h-[15px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-md p-4 text-center text-sm text-gray-500">
                No Records Found
              </div>
            )}
          </div> */}

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

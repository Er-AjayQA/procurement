import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { getEmployeeDetails } from "../../../../services/employeeDetails_services/services";

export const TransferSourceDetailsForm = ({
  control,
  register,
  setValue,
  watch,
  findSelectedOption,
  selectedUser,
}) => {
  const {
    data,
    formSelectStyles,
    updateId,
    userOptions,
    handleTabClick,
    tabType,
    handleComponentView,
  } = useEmployeeTransferContext();

  const [userDetail, setUserDetail] = useState(null);

  // Get User Detail
  const getUserDetail = async (id) => {
    try {
      const response = await getEmployeeDetails(id);

      if (response.data.success) {
        setUserDetail(response.data.data[0]);
        setValue("emp_code", response.data.data[0].emp_code);
        setValue("from_role_id", response.data.data[0].role_id);
        setValue("from_dept_id", response.data.data[0].dep_id);
        setValue("from_desig_id", response.data.data[0].designation_id);
        setValue("from_branch_id", response.data.data[0].branch_id);
        setValue(
          "current_report_to_user_id",
          response.data.data[0].reporting_manager_id
        );

        setValue("from_role_name", response.data.data[0].role_name);
        setValue("from_dept_name", response.data.data[0].department_name);
        setValue("from_desig_name", response.data.data[0].designation_name);
        setValue("from_branch_name", response.data.data[0].branch_name);
        setValue(
          "current_report_to_user_name",
          response.data.data[0].reporting_manager
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUserDetail(null);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getUserDetail(selectedUser);
    } else {
      setUserDetail(null);
      setValue("from_role_id", "");
      setValue("from_dept_id", "");
      setValue("from_desig_id", "");
      setValue("from_branch_id", "");
      setValue("current_report_to_user_id", "");
    }
  }, [selectedUser]);

  return (
    <div className="shadow-lg rounded-md">
      <div className="bg-gray-100 py-2 px-1 rounded-t-md">
        <h3 className="text-black text-xs font-bold">Current Details</h3>
      </div>
      <div className="flex py-5 px-3 flex-col gap-5">
        {/* Row-1 */}
        <div className="grid grid-cols-12 gap-5">
          {/* User Name */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="requested_for_user_id" className="text-sm">
                Employee Name
              </label>
              <Controller
                name="requested_for_user_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={userOptions || []}
                    value={findSelectedOption(userOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select employee..."
                    isClearable
                    isSearchable
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isDisabled={tabType.value === "pending_for_approval"}
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

          {/* Employee Code */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="emp_code" className="text-sm">
                Employee Code
              </label>
              <input
                type="text"
                id="emp_code"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Employee code..."
                {...register("emp_code")}
                value={userDetail?.emp_code || ""}
                readOnly
              />
            </div>
          </div>

          {/* Employee Role */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="from_role_id" className="text-sm">
                Role
              </label>
              <input
                type="text"
                id="from_role_id"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="current role..."
                {...register("from_role_id")}
                value={userDetail?.role_name || ""}
                readOnly
              />
            </div>
          </div>

          {/* Employee Department */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="from_dept_id" className="text-sm">
                Department
              </label>
              <input
                type="text"
                id="from_dept_id"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="current department..."
                {...register("from_dept_id")}
                value={userDetail?.department_name || ""}
                readOnly
              />
            </div>
          </div>

          {/* Employee Designation */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="from_desig_id" className="text-sm">
                Designation
              </label>
              <input
                type="text"
                id="from_desig_id"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="current designation..."
                {...register("from_desig_id")}
                value={userDetail?.designation_name || ""}
                readOnly
              />
            </div>
          </div>

          {/* Current Reporting Manager */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="current_report_to_user_name" className="text-sm">
                Reporting Manager
              </label>
              <input
                type="text"
                id="current_report_to_user_name"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="current reporting manager..."
                {...register("current_report_to_user_name")}
                value={userDetail?.reporting_manager || ""}
                readOnly
              />
            </div>
          </div>

          {/* Employee Branch */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="from_branch_id" className="text-sm">
                Branch
              </label>
              <input
                type="text"
                id="from_branch_id"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="current branch..."
                {...register("from_branch_id")}
                value={userDetail?.branch_name || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";

export const TransferDestinationDetailsForm = ({
  control,
  register,
  setValue,
  watch,
  findSelectedOption,
  selectedUser,
}) => {
  const {
    updateId,
    data,
    formSelectStyles,
    handleComponentView,
    handleTabClick,
    tabType,
    userOptions,
    rolesOptions,
    departmentOptions,
    designationOptions,
    branchOptions,
  } = useEmployeeTransferContext();

  return (
    <div className="shadow-lg rounded-md">
      <div className="bg-gray-100 py-2 px-1 rounded-t-md">
        <h3 className="text-black text-xs font-bold">Destination Details</h3>
      </div>
      <div className="flex py-5 px-3 flex-col gap-5">
        {/* Row-1 */}
        <div className="grid grid-cols-12 gap-5">
          {/* Destination Branch */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="to_branch_id" className="text-sm">
                Branch
              </label>
              <Controller
                name="to_branch_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={branchOptions || []}
                    value={findSelectedOption(branchOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select branch..."
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

          {/* User Name */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="report_to_user_id" className="text-sm">
                Report To
              </label>
              <Controller
                name="report_to_user_id"
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

          {/* Destination Role */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="to_role_id" className="text-sm">
                Role
              </label>
              <Controller
                name="to_role_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={rolesOptions || []}
                    value={findSelectedOption(rolesOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select role..."
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

          {/* Destination Designation */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="to_desig_id" className="text-sm">
                Designation
              </label>
              <Controller
                name="to_desig_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={designationOptions || []}
                    value={findSelectedOption(designationOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select designation..."
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

          {/* Destination Department */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="to_dept_id" className="text-sm">
                Department
              </label>
              <Controller
                name="to_dept_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={departmentOptions || []}
                    value={findSelectedOption(departmentOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select department..."
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

          {/*  New Salary */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="new_salary" className="text-sm">
                Proposed Salary
              </label>
              <input
                type="number"
                id="new_salary"
                className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                placeholder="Enter base salary..."
                readOnly={tabType.value === "pending_for_approval"}
                {...register("new_salary")}
              />
            </div>
          </div>

          {/* Select Approvers */}
          {tabType.value === "my_requests" ? (
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="approvers_list" className="text-sm">
                  Approver
                </label>
                <Controller
                  name="approvers_list"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={userOptions || []}
                      value={
                        userOptions?.filter((option) =>
                          field.value?.includes(option.value)
                        ) || []
                      }
                      onChange={(selected) => {
                        const selectedValues = selected
                          ? selected.map((option) => option.value)
                          : [];
                        field.onChange(selectedValues);
                      }}
                      placeholder="Select approvers..."
                      isMulti
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

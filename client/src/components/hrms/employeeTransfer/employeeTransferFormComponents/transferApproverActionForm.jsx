import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";
import { useState } from "react";

export const TransferApproverActionForm = ({
  control,
  register,
  findSelectedOption,
}) => {
  const { formSelectStyles } = useEmployeeTransferContext();

  const [approverStatusOptions, setApproverStatusOptions] = useState([
    {
      value: "APPROVED",
      label: "APPROVED",
    },
    {
      value: "REJECTED",
      label: "REJECTED",
    },
  ]);

  return (
    <div className="shadow-lg rounded-md">
      <div className="bg-gray-100 py-2 px-1 rounded-t-md">
        <h3 className="text-black text-xs font-bold">Approver Action</h3>
      </div>
      <div className="flex py-5 px-3 flex-col gap-5">
        {/* Row-1 */}
        <div className="grid grid-cols-12 gap-5">
          {/* Remark */}
          <div className="col-span-6 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="comments" className="text-sm">
                Remark
              </label>
              <textarea
                name="comments"
                id="comments"
                className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                placeholder="Enter comments..."
                {...register("comments")}
              />
            </div>
          </div>

          {/* Select Approvers */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="approver_status" className="text-sm">
                Status
              </label>
              <Controller
                name="approver_status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={approverStatusOptions || []}
                    value={findSelectedOption(
                      approverStatusOptions,
                      field.value
                    )}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select status..."
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
        </div>
      </div>
    </div>
  );
};

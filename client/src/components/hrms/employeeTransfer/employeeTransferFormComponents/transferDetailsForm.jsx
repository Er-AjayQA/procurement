import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeTransferContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";

export const TransferDetailsForm = ({
  control,
  register,
  setValue,
  watch,
  findSelectedOption,
}) => {
  const {
    updateId,
    data,
    formSelectStyles,
    handleComponentView,
    handleTabClick,
    tabType,
    transferTypeOptions,
    transferReasonOptions,
  } = useEmployeeTransferContext();

  const selectedTransferType = watch("transfer_type_id");
  const [showApplicableTo, setShowApplicableTo] = useState(false);

  // useEffect(() => {
  //   if (selectedTransferType === "Temporary") {
  //     setShowApplicableTo(true);
  //   } else {
  //     setShowApplicableTo(false);
  //   }
  // }, [selectedTransferType]);

  return (
    <div className="shadow-lg rounded-md">
      <div className="bg-gray-100 py-2 px-1 rounded-t-md">
        <h3 className="text-black text-xs font-bold">Transfer Details</h3>
      </div>
      <div className="flex py-5 px-3 flex-col gap-5">
        {/* Row-1 */}
        <div className="grid grid-cols-12 gap-5">
          {/* Transfer Type */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="transfer_type_id" className="text-sm">
                Transfer Type
              </label>
              <Controller
                name="transfer_type_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={transferTypeOptions || []}
                    value={findSelectedOption(transferTypeOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                      setShowApplicableTo(selected?.label);
                    }}
                    placeholder="Select type..."
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

          {/* Transfer Reason */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="transfer_reason_id" className="text-sm">
                Transfer Reason
              </label>
              <Controller
                name="transfer_reason_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={transferReasonOptions || []}
                    value={findSelectedOption(
                      transferReasonOptions,
                      field.value
                    )}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select reason..."
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

          {/*  Applicable Date */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="applicable_from_date" className="text-sm">
                Applicable From Date
              </label>
              <input
                type="date"
                id="applicable_from_date"
                className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                placeholder="Applicable from..."
                {...register("applicable_from_date")}
              />
            </div>
          </div>
        </div>

        {showApplicableTo === "Temporary" && (
          <div className="grid grid-cols-12 gap-5">
            {/*  Applicable To */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="applicable_to_date" className="text-sm">
                  Applicable To Date
                </label>
                <input
                  type="date"
                  id="applicable_to_date"
                  className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                  placeholder="Applicable to..."
                  {...register("applicable_to_date")}
                />
              </div>
            </div>
          </div>
        )}

        {/*  Remark */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="detailed_reason" className="text-sm">
              Remark
            </label>
            <textarea
              name="detailed_reason"
              id="detailed_reason"
              className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
              placeholder="Type transfer details..."
              {...register("detailed_reason")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

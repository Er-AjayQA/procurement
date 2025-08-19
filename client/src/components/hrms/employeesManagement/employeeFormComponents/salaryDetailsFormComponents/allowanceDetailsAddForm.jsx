import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { useEffect, useState } from "react";
import { AddButton } from "../../../../UI/addButtonUi";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const AllowanceDetailsAddItem = ({
  isVisible,
  onClose,
  onAddFamilyRow,
  onUpdateFamilyRow,
  updateData,
  updateIndex,
  setUpdateIndex,
}) => {
  const { allowancesOptions, formSelectStyles } = useEmployeeContext();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (updateData) {
      setValue("member_name", updateData?.member_name);
      setValue("relation_type", updateData?.relation_type);
      setValue("dob", updateData?.dob);
      setValue("contact_number", updateData?.contact_number);
      setValue("remark", updateData?.remark);
      setValue("selected_as_emergency", updateData?.selected_as_emergency);

      if (updateData?.contact_number) {
        const [code, number] = updateData.contact_number.split("-");
        setValue("contact_number", number);

        // Find and set the country code option
        const allowanceOption = allowancesOptions?.find(
          (option) => option.value == code
        );
        if (allowanceOption) {
          setValue("allowance_id", allowanceOption.value);
        }
      }
    } else {
      reset();
    }
  }, [updateData, reset, setValue, allowancesOptions]);

  const onSubmit = (data) => {
    const countryCode =
      typeof data.code === "object" ? data.code.value : data.code;

    const familyData = {
      member_name: data.member_name,
      dob: data.dob,
      relation_type: data.relation_type,
      contact_number: `${countryCode}-${data?.contact_number}`,
      remark: data.remark,
      selected_as_emergency: data.selected_as_emergency || false,
    };

    if (updateData) {
      onUpdateFamilyRow(familyData, updateIndex);
      setUpdateIndex(null);
    } else {
      onAddFamilyRow(familyData);
    }
    reset();
    onClose();
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  // Handle Form Reset
  const handleFormReset = () => {
    onClose();
    reset({
      company_name: "",
      from_date: "",
      to_date: "",
      last_drawn_salary: "",
      location: "",
      reason_of_leaving: "",
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-[#0202025b] ${
          isVisible ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            Add Allowance Details
          </h3>
          <div
            onClick={() => handleFormReset()}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto scrollbar-hide">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-10 space-y-4"
          >
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="allowance_id"
              >
                Allowance Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="allowance_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={allowancesOptions || []}
                    value={findSelectedOption(allowancesOptions, field.value)}
                    onChange={(selected) => {
                      field.onChange(selected?.value || "");
                    }}
                    placeholder="Select allowance..."
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
              {errors.allowance_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.allowance_id.message}
                </p>
              )}
            </div>

            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-sm">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter amount..."
                  {...register("amount", { required: "Amount is required!" })}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="bg-button-color hover:bg-button-hover rounded-lg p-2 px-4 text-white text-sm"
              >
                {updateData ? "Update Details" : "Add Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

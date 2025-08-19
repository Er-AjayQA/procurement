import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { useEffect, useState } from "react";
import { AddButton } from "../../../../UI/addButtonUi";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const PreviousEmployerDetailsAddItem = ({
  isVisible,
  onClose,
  onAddFamilyRow,
  updateData,
}) => {
  const { countryCodeOptions, setFamilyFormVisible, formSelectStyles } =
    useEmployeeContext();

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
      setValue("code", updateData?.code);
      setValue("contact_number", updateData?.contact_number);
      setValue("remark", updateData?.remark);
      setValue("selected_as_emergency", updateData?.selected_as_emergency);
    } else {
      reset();
    }
  }, [updateData, reset, setValue]);

  const onSubmit = (data) => {
    const familyData = {
      member_name: data.member_name,
      dob: data.dob,
      relation_type: data.relation_type,
      contact_number: `${data.code}${data.contact_number}`,
      remark: data.remark,
      selected_as_emergency: data.selected_as_emergency || false,
    };

    onAddFamilyRow(familyData);
    reset();
    onClose();
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
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
            Add Previous Employers Details
          </h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="member_name"
            >
              Member Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="member_name"
              className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter member name..."
              {...register("member_name", {
                required: "Member name is required",
              })}
            />
            {errors.member_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.member_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="relation_type"
            >
              Relationship Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="relation_type"
              className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter relation type..."
              {...register("relation_type", {
                required: "Relation type is required",
              })}
            />
            {errors.relation_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.relation_type.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dob"
            >
              D.O.B <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter dob..."
              {...register("dob", {
                required: "DOB is required",
              })}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="col-span-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-sm">
                Contact No.
              </label>
              <div className="flex">
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: "Country code is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryCodeOptions || []}
                      value={findSelectedOption(
                        countryCodeOptions,
                        field.value
                      )}
                      onChange={(selected) =>
                        field.onChange(selected?.value || "")
                      }
                      placeholder="code"
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
                <input
                  type="text"
                  id="contact_number"
                  className="flex-grow rounded-e-lg border-s-0 text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter contact number"
                  {...register("contact_number", {
                    required: "Contact number is required!",
                  })}
                />
              </div>
              {errors.code && errors.contact_number ? (
                <p className="text-red-500 text-[.7rem]">
                  Both country code and contact number are required!
                </p>
              ) : errors.code ? (
                <p className="text-red-500 text-[.7rem]">
                  {errors.code.message}
                </p>
              ) : errors.contact_number ? (
                <p className="text-red-500 text-[.7rem]">
                  {errors.contact_number.message}
                </p>
              ) : null}
            </div>
          </div>

          {/* Remark */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="remark"
            >
              Remark
            </label>
            <textarea
              name="remark"
              id="remark"
              className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter remark..."
              {...register("remark")}
            />
          </div>

          {/* Selected as Emergency */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="selected_as_emergency"
              className="text-[.8rem] border border-black cursor-pointer"
              {...register("selected_as_emergency")}
            />
            <label
              className="block text-sm font-medium text-gray-700 cursor-pointer"
              htmlFor="selected_as_emergency"
            >
              Selected as Emergency
            </label>
          </div>

          <div className="pt-4">
            <AddButton
              type="submit"
              text={"Add Details"}
              onClick={() => setFamilyFormVisible(false)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

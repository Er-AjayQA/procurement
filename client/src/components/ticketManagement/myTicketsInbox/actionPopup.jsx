import { MdOutlineClose } from "react-icons/md";
import { useMyTicketsInboxContext } from "../../../contextApis/useTicketContextFile";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  allocateTicket,
  approvalForTicket,
} from "../../../services/ticket_services/service";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";
import { useEffect } from "react";

export const TicketActionPopup = ({ showActionPopup, setShowActionPopup }) => {
  const { allocationData, data, setViewId, refreshData, formSelectStyles } =
    useMyTicketsInboxContext();

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
      allocated_to_user_id: "",
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const [userOptions, setUserOptions] = useState(null);
  const [approverStatusOptions, setApproverStatusOptions] = useState([
    { value: "ESCALATED", label: "ESCALATED" },
    { value: "CLOSE", label: "CLOSE" },
  ]);
  const approverStatusType = watch("approver_status");

  // Handle Click Cancel Button
  const handleCancel = () => {
    resetForm();
    setViewId(null);
    setShowActionPopup(false);
  };

  const resetForm = () => {
    reset({
      approver_status: "",
      allocated_to_user_id: "",
      remark: "",
    });
  };

  // Get All Users List
  const getAllUsersOptions = async () => {
    try {
      const response = await getAllEmployeeDetails({
        limit: "",
        page: "",
        filter: {
          role_id: "",
          user_id: "",
        },
      });

      if (response.success) {
        const userData = response?.data;
        // Filter and map properly
        const filteredOptions = userData
          .filter((item) => item?.id !== userDetails?.id)
          .map((item) => ({
            value: item?.id,
            label: `${item?.title} ${item?.name} - ${item?.emp_code}`,
          }));

        setUserOptions(filteredOptions);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUserOptions(null);
    }
  };

  // Handle Form Submission
  const onSubmit = async (formData, e) => {
    try {
      e.preventDefault();
      let response;
      let payload;

      if (approverStatusType === "CLOSE") {
        payload = {
          approver_status: formData?.approver_status,
          remark: formData?.remark,
        };
      } else {
        payload = {
          approver_status: formData?.approver_status,
          allocated_to_user_id: formData?.allocated_to_user_id,
          remark: formData?.remark,
        };
      }

      response = await approvalForTicket(
        allocationData?.approval_id,
        allocationData?.current_allocated_user_id,
        payload
      );

      if (response.success) {
        toast.success(response.message);
        if (typeof refreshData === "function") {
          refreshData();
        }
        handleCancel();
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
    return options.find((opt) => opt?.value === value);
  };

  useEffect(() => {
    getAllUsersOptions();
  }, [data]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 backdrop-blur-sm transition-all duration-[.4s] ${
          showActionPopup ? "block" : "hidden"
        }`}
      ></div>

      {/* List Form */}
      <div
        className={`absolute top-[50%] start-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 min-h-[40%] shadow-lg rounded-lg transition-all duration-[.4s]`}
      >
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex items-center justify-between">
          <h3 className="text-white text-xs font-bold">Reply Ticket</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white cursor-pointer"
            onClick={handleCancel}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="basis-[90%] justify-around rounded-md pb-4 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Approver Status */}
                <div className="col-span-6 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="approver_status"
                      className="text-sm font-medium"
                    >
                      Status
                    </label>
                    <Controller
                      name="approver_status"
                      control={control}
                      rules={{
                        required: "Status is required!",
                      }}
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
                          styles={formSelectStyles}
                        />
                      )}
                    />
                    {errors.approver_status && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.approver_status.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Employee Name */}
                {approverStatusType === "ESCALATED" && (
                  <div className="col-span-6 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="allocated_to_user_id"
                        className="text-sm font-medium"
                      >
                        Select Employee
                      </label>
                      <Controller
                        name="allocated_to_user_id"
                        control={control}
                        rules={{
                          required: "Employee is required!",
                        }}
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
                            styles={formSelectStyles}
                          />
                        )}
                      />
                      {errors.allocated_to_user_id && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.allocated_to_user_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row-2 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Approver Remark */}
                <div className="col-span-12 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="remark" className="text-sm">
                      Remark
                    </label>
                    <textarea
                      id="remark"
                      rows={5}
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="remark..."
                      {...register("remark", {
                        required: "Description is required!",
                      })}
                    />
                    {errors.remark && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.remark.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 px-10">
              <button
                type="submit"
                className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

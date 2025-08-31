import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useDepartmentalTicketsContext } from "../../../contextApis/useTicketContextFile";
import { getTicketCategoryById } from "../../../services/master_services/service";
import {
  createTicket,
  updateTicket,
} from "../../../services/ticket_services/service";

export const DepartmentalTicketForm = () => {
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
    loginUserData,
    departmentOptions,
    ticketCategoryOptions,
    userOptions,
    refreshData,
    formSelectStyles,
  } = useDepartmentalTicketsContext();

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
      created_by_user_id: "",
      created_for_dept_id: "",
      ticket_category_id: "",
      ticket_type: "",
      ticket_status: "",
      ticket_description: "",
      ticket_subject: "",
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const selectedTicketCategory = watch("ticket_category_id");
  const [ticketTypeValue, setTicketTypeValue] = useState("Self");
  const [ticketTypeOptions, setTicketTypeOptions] = useState([
    { value: "Self", label: "For Self" },
    { value: "Colleague", label: "For Colleague" },
  ]);
  const [ticketCategoryData, setTicketCategoryData] = useState(null);

  // Handle Click Cancel Button
  const handleCancel = () => {
    resetForm();
    handleFormClose();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  };

  // Get ticket category data
  const getTicketCategoryData = async (id) => {
    try {
      const response = await getTicketCategoryById(id);
      if (response.success) {
        setTicketCategoryData(response.data[0]);
        setValue("ticket_priority", response.data[0]?.ticket_category_priority);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setTicketCategoryData(null);
      setValue("ticket_priority", "");
    }
  };

  const resetForm = () => {
    reset({
      user_id: "",
      created_by_user_id: "",
      created_for_dept_id: "",
      ticket_category_id: "",
      ticket_priority: "",
      ticket_subject: "",
      ticket_description: "",
    });

    setTicketTypeValue("Self");
  };

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      const setUpdateDefaultData = () => {
        setValue("ticket_type", data?.ticket_type);
        setValue("created_by_user_id", data?.created_by_user_id);
        setValue("created_for_dept_id", data?.created_for_dept_id);
        setValue("created_by_user_id", data?.created_by_user_id);
        setValue("ticket_status", data?.ticket_status);
        setValue("ticket_subject", data?.ticket_subject);
        setValue("ticket_description", data?.ticket_description);

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

      const payload = {
        ticket_type: ticketTypeValue,
        user_id: formData?.user_id.value,
        created_by_user_id: userDetails?.id,
        created_for_dept_id: formData?.created_for_dept_id,
        ticket_category_id: formData?.ticket_category_id,
        ticket_priority: formData?.ticket_priority,
        ticket_subject: formData?.ticket_subject,
        ticket_description: formData?.ticket_description,
      };

      if (updateId) {
        response = await updateTicket(updateId, payload);
      } else {
        response = await createTicket(payload);
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

  // Auto Select user is Ticket Type is "Self"
  useEffect(() => {
    if (ticketTypeValue === "Self") {
      let userOption = userOptions?.find(
        (item) => item?.value == loginUserData?.id
      );
      setValue("user_id", userOption.value);
    } else {
      setValue("user_id", "");
    }
  }, [ticketTypeValue, setValue]);

  // Get Category Data on Category Change
  useEffect(() => {
    getTicketCategoryData(selectedTicketCategory);
  }, [selectedTicketCategory]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3  border-b border-gray-400">
          <div>
            <p className="text-sm font-bold">
              {updateId ? "Update" : "Raise"} Ticket
            </p>
          </div>
          <button
            className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
            onClick={handleCancel}
          >
            Back
          </button>
        </div>

        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide py-5">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Raise Ticket</h3>
          </div>

          <div className="p-5">
            <div className="flex flex-col gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-10"
              >
                <div className="flex py-5 px-3 flex-col gap-5">
                  {/* Row-1 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Ticket Type */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="self" className="text-sm">
                          Ticket Type
                        </label>

                        <div className="flex gap-5">
                          {ticketTypeOptions?.map((type) => {
                            return (
                              <div
                                className="flex items-center gap-3"
                                key={type.value}
                              >
                                <label className="inline-flex items-center">
                                  <input
                                    type="radio"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    value={type.value}
                                    checked={
                                      ticketTypeValue === `${type.value}`
                                    }
                                    onChange={() =>
                                      setTicketTypeValue(type.value)
                                    }
                                  />
                                  <span className="ml-2 text-sm text-gray-700">
                                    {type.label}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Employee Name */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="user_id"
                          className="text-sm font-medium"
                        >
                          {ticketTypeValue === "Self"
                            ? "Employee Name"
                            : "Select Colleague"}
                        </label>
                        <Controller
                          name="user_id"
                          control={control}
                          rules={{
                            required:
                              ticketTypeValue === "Colleague"
                                ? "Please select a colleague"
                                : false,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={userOptions || []}
                              value={findSelectedOption(
                                userOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || "");
                              }}
                              placeholder="Select employee..."
                              isClearable
                              isSearchable
                              isDisabled={ticketTypeValue === "Self"}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.user_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.user_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Department Name */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="created_for_dept_id"
                          className="text-sm font-medium"
                        >
                          Department
                        </label>
                        <Controller
                          name="created_for_dept_id"
                          control={control}
                          rules={{
                            required: "Department is required!",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={departmentOptions || []}
                              value={findSelectedOption(
                                departmentOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || "");
                              }}
                              placeholder="Select department..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.created_for_dept_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.created_for_dept_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row-2 */}
                  <div className="grid grid-cols-12 gap-5 mt-5">
                    {/* Ticket Category Name */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="ticket_category_id"
                          className="text-sm font-medium"
                        >
                          Ticket Category
                        </label>
                        <Controller
                          name="ticket_category_id"
                          control={control}
                          rules={{
                            required: "Category is required!",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={ticketCategoryOptions || []}
                              value={findSelectedOption(
                                ticketCategoryOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || "");
                              }}
                              placeholder="Select category..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.ticket_category_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.ticket_category_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/*  Priority */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ticket_priority" className="text-sm">
                          Priority
                        </label>
                        <input
                          type="text"
                          id="ticket_priority"
                          className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                          placeholder="Ticket priority..."
                          readOnly
                          {...register("ticket_priority")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row-3 */}
                  <div className="flex flex-col gap-5 mt-5 shadow-2xl rounded-t-lg">
                    <div className="p-2 bg-gray-600 rounded-t-lg">
                      <h5 className="text-white font-bold text-xs">
                        Ticket Details
                      </h5>
                    </div>

                    <div className="p-5 flex flex-col gap-5">
                      {/*  Ticket Subject */}
                      <div className="w-[40%] flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="ticket_subject" className="text-sm">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="ticket_subject"
                            className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                            placeholder="Ticket subject..."
                            {...register("ticket_subject", {
                              required: "Subject is required!",
                            })}
                          />
                          {errors.ticket_subject && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.ticket_subject.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/*  Ticket Description */}
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="ticket_description"
                            className="text-sm"
                          >
                            Description
                          </label>
                          <textarea
                            name="ticket_description"
                            id="ticket_description"
                            className={`rounded-lg text-[.8rem] hover:border-borders-inputHover `}
                            placeholder="Ticket description..."
                            {...register("ticket_description", {
                              required: "Description is required!",
                            })}
                          />
                          {errors.ticket_description && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.ticket_description.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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

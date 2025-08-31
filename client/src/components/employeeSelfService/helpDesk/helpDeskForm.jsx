import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useHelpDeskContext } from "../../../contextApis/useEssContextFile";
import { getTicketCategoryById } from "../../../services/master_services/service";
import {
  createTicket,
  updateTicket,
} from "../../../services/ticket_services/service";

const TICKET_TYPES = {
  SELF: "Self",
  COLLEAGUE: "Colleague",
};

const TICKET_TYPE_OPTIONS = [
  { value: TICKET_TYPES.SELF, label: "For Self" },
  { value: TICKET_TYPES.COLLEAGUE, label: "For Colleague" },
];

export const HelpDeskForm = () => {
  const {
    data,
    updateId,
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
  } = useHelpDeskContext();

  const isEditMode = Boolean(updateId);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      user_id: null,
      created_for_dept_id: null,
      ticket_category_id: null,
      ticket_priority: "",
      ticket_subject: "",
      ticket_description: "",
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const selectedTicketCategory = watch("ticket_category_id");
  const [ticketTypeValue, setTicketTypeValue] = useState(
    isEditMode && data?.ticket_type ? data.ticket_type : TICKET_TYPES.SELF
  );
  const [ticketCategoryData, setTicketCategoryData] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Memoized user option for current user
  const currentUserOption = useMemo(
    () => userOptions?.find((item) => item.value === loginUserData?.id),
    [userOptions, loginUserData]
  );

  // Reset form function
  const resetForm = useCallback(() => {
    reset({
      user_id: null,
      created_for_dept_id: null,
      ticket_category_id: null,
      ticket_priority: "",
      ticket_subject: "",
      ticket_description: "",
    });
    setTicketTypeValue(TICKET_TYPES.SELF);
    setTicketCategoryData(null);
  }, [reset]);

  // Handle Click Cancel Button
  const handleCancel = useCallback(() => {
    resetForm();
    handleFormClose();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  }, [resetForm, handleFormClose, handleComponentView, setData, setUpdateId]);

  // Get ticket category data
  const getTicketCategoryData = useCallback(
    async (id) => {
      if (!id) {
        setTicketCategoryData(null);
        setValue("ticket_priority", "");
        return;
      }

      try {
        const response = await getTicketCategoryById(id);
        if (response.success) {
          setTicketCategoryData(response.data[0]);
          setValue(
            "ticket_priority",
            response.data[0]?.ticket_category_priority || ""
          );
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setTicketCategoryData(null);
        setValue("ticket_priority", "");
        console.error("Error fetching ticket category:", error);
      }
    },
    [setValue]
  );

  // Set Employee User ID based on ticket type
  const setCreatedForUserID = useCallback(() => {
    if (ticketTypeValue === TICKET_TYPES.SELF && currentUserOption) {
      setValue("user_id", currentUserOption.value);
    } else if (ticketTypeValue === TICKET_TYPES.COLLEAGUE) {
      setValue("user_id", "");
    }
  }, [ticketTypeValue, setValue, currentUserOption]);

  // Set form values when in update mode - FIXED VERSION
  useEffect(() => {
    if (isEditMode && data) {
      const setUpdateDefaultData = async () => {
        try {
          // Set Ticket Type first
          if (data?.ticket_type) {
            setTicketTypeValue(data?.ticket_type);
          }

          // Set user based on ticket type
          if (data?.ticket_type === TICKET_TYPES.COLLEAGUE && data?.user_id) {
            // Wait for userOptions to be available
            if (userOptions && userOptions.length > 0) {
              const userOption = userOptions.find(
                (item) => item.value === data.user_id
              );
              if (userOption) {
                setValue("user_id", data.user_id);
              }
            }
          } else if (data?.ticket_type === TICKET_TYPES.SELF) {
            setValue("user_id", loginUserData?.id);
          }

          // Set other form values
          setValue("created_for_dept_id", data?.created_for_dept_id);
          setValue("ticket_category_id", data?.ticket_category_id);
          setValue("ticket_priority", data?.ticket_priority);
          setValue("ticket_subject", data?.ticket_subject);
          setValue("ticket_description", data?.ticket_description);

          // Fetch category data for priority
          if (data?.ticket_category_id) {
            await getTicketCategoryData(data?.ticket_category_id);
          }
        } catch (error) {
          console.error("Error setting update data:", error);
          toast.error("Failed to load ticket data");
        }
      };

      setUpdateDefaultData();
    }
  }, [
    isEditMode,
    data,
    setValue,
    userOptions,
    loginUserData,
    getTicketCategoryData,
  ]);

  // Handle Form Submission
  const onSubmit = async (formData) => {
    try {
      const payload = {
        ticket_type: ticketTypeValue,
        user_id: formData.user_id,
        created_by_user_id: userDetails?.id,
        created_for_dept_id: formData.created_for_dept_id,
        ticket_category_id: formData.ticket_category_id,
        ticket_priority: formData.ticket_priority,
        ticket_subject: formData.ticket_subject,
        ticket_description: formData.ticket_description,
        acted_on: new Date(),
      };

      const response = isEditMode
        ? await updateTicket(updateId, payload)
        : await createTicket(payload);

      if (response.success) {
        toast.success(response.message);

        if (typeof refreshData === "function") {
          refreshData();
        }

        resetForm();
        handleComponentView("listing");
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Helper function to find selected option
  const findSelectedOption = useCallback((options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value) || null;
  }, []);

  // Auto Select user if Ticket Type is "Self"
  useEffect(() => {
    if (!isEditMode) {
      setCreatedForUserID();
    }
  }, [ticketTypeValue, setCreatedForUserID, isEditMode]);

  // Get Category Data on Category Change
  useEffect(() => {
    if (selectedTicketCategory) {
      getTicketCategoryData(selectedTicketCategory);
    } else {
      setTicketCategoryData(null);
      setValue("ticket_priority", "");
    }
  }, [selectedTicketCategory, getTicketCategoryData, setValue]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-3 border-b border-gray-400">
        <div>
          <p className="text-sm font-bold">
            {isEditMode ? "Update" : "Raise"} Ticket
          </p>
        </div>
        <button
          className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration-300"
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
                    <label className="text-sm">Ticket Type</label>
                    <div className="flex gap-5">
                      {TICKET_TYPE_OPTIONS.map((type) => (
                        <div
                          className="flex items-center gap-3"
                          key={type.value}
                        >
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              value={type.value}
                              checked={ticketTypeValue === type.value}
                              onChange={() => setTicketTypeValue(type.value)}
                              disabled={isEditMode} // Disable in edit mode
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {type.label}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Employee Name */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="user_id" className="text-sm font-medium">
                      {ticketTypeValue === TICKET_TYPES.SELF
                        ? "Employee Name"
                        : "Select Colleague"}
                    </label>
                    <Controller
                      name="user_id"
                      control={control}
                      rules={{
                        required:
                          ticketTypeValue === TICKET_TYPES.COLLEAGUE
                            ? "Please select a colleague"
                            : false,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={userOptions || []}
                          value={findSelectedOption(userOptions, field.value)}
                          onChange={(selected) => {
                            field.onChange(selected?.value || null);
                          }}
                          placeholder={
                            ticketTypeValue === TICKET_TYPES.SELF
                              ? "Auto-selected"
                              : "Select employee..."
                          }
                          isClearable
                          isSearchable
                          isDisabled={ticketTypeValue === TICKET_TYPES.SELF}
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
                            field.onChange(selected?.value || null);
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
                            field.onChange(selected?.value || null);
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

                {/* Priority */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ticket_priority" className="text-sm">
                      Priority
                    </label>
                    <input
                      type="text"
                      id="ticket_priority"
                      className="rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  {/* Ticket Subject */}
                  <div className="w-[40%] flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ticket_subject" className="text-sm">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="ticket_subject"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.ticket_subject ? "border-red-500" : ""
                        }`}
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

                  {/* Ticket Description */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ticket_description" className="text-sm">
                        Description
                      </label>
                      <textarea
                        id="ticket_description"
                        rows={5}
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.ticket_description ? "border-red-500" : ""
                        }`}
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
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300"
                >
                  {isSubmitting
                    ? "Processing..."
                    : isEditMode
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

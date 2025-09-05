import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useCallback, useState } from "react";
import {
  getAllCities,
  getAllStates,
  getTicketCategoryById,
} from "../../../services/master_services/service";
import {
  createTicket,
  updateTicket,
} from "../../../services/ticket_services/service";
import { useRegisteredEventsContext } from "../../../contextApis/useEventContextFile";

const TICKET_TYPES = {
  SELF: "Self",
  COLLEAGUE: "Colleague",
};

const TICKET_TYPE_OPTIONS = [
  { value: TICKET_TYPES.SELF, label: "For Self" },
  { value: TICKET_TYPES.COLLEAGUE, label: "For Colleague" },
];

export const RegisteredEventsForm = () => {
  const {
    data,
    updateId,
    handleComponentView,
    handleFormClose,
    setUpdateId,
    setData,
    loginUserData,
    departmentOptions,
    eventCategoryOptions,
    registrationRequiredOptions,
    userOptions,
    countryOptions,
    eventTypeOptions,
    sittingTypeOptions,
    refreshData,
    formSelectStyles,
  } = useRegisteredEventsContext();

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
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const selectedCountry = watch("event_country_id");
  const selectedState = watch("event_state_id");
  const selectedSittingType = watch("sitting_type");
  const [selectedEventType, setselectedEventType] = useState("In-Person");
  const [selectedRegisterType, setSelectedRegisterType] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

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
    setselectedEventType("In-Person");
  }, [reset]);

  // Handle Click Cancel Button
  const handleCancel = useCallback(() => {
    resetForm();
    handleFormClose();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  }, [resetForm, handleFormClose, handleComponentView, setData, setUpdateId]);

  // Set form values when in update mode - FIXED VERSION
  useEffect(() => {
    if (isEditMode && data) {
      const setUpdateDefaultData = async () => {
        try {
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
        } catch (error) {
          console.error("Error setting update data:", error);
          toast.error("Failed to load ticket data");
        }
      };

      setUpdateDefaultData();
    }
  }, [isEditMode, data, setValue, userOptions, loginUserData]);

  // Get State Options
  const getAllStatesOptions = async (id) => {
    try {
      const response = await getAllStates({
        limit: "50000",
        page: 1,
        filter: {
          country_id: id,
          name: "",
        },
      });

      if (response.success) {
        setStatesOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        setStatesOptions(null);
      }
    } catch (error) {
      console.error("Error fetching States options:", error);
    }
  };

  // Get Cities Options
  const getAllCitiesOptions = async (state_id, country_id) => {
    try {
      const response = await getAllCities({
        limit: "50000",
        page: 1,
        filter: {
          state_id,
          country_id,
          name: "",
        },
      });

      if (response.success) {
        setCitiesOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        setCitiesOptions(null);
      }
    } catch (error) {
      console.error("Error fetching Cities options:", error);
    }
  };

  // Handle Form Submission
  const onSubmit = async (formData) => {
    try {
      const payload = {
        event_type: selectedEventType,
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

  // Fetching States on Country Selection
  useEffect(() => {
    if (selectedCountry) {
      getAllStatesOptions(selectedCountry);
    }
  }, [selectedCountry]);

  // Fetching Cities on State & Country Selection
  useEffect(() => {
    if (selectedCountry && selectedState) {
      getAllCitiesOptions(selectedState, selectedCountry);
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-3 border-b border-gray-400">
        <div>
          <p className="text-sm font-bold">
            {isEditMode ? "Update" : "Create"} Event
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
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs">Add Event</h3>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-2 gap-10">
              {/* Basic Details Section */}
              <div className="flex flex-col gap-3 shadow-lg rounded-t-lg">
                {/* Section Title */}
                <div className="p-2 bg-gray-200 rounded-t-lg">
                  <h5 className="text-gray-600 font-bold text-xs">
                    Basic Details
                  </h5>
                </div>

                {/* Section Body */}
                <div className="p-5 py-2 pb-5 flex flex-col gap-10">
                  {/* Row - 1 */}
                  <div className="grid grid-cols-12 gap-3">
                    {/* Event Type */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <label className="text-sm">Type:</label>
                      <div className="flex gap-5">
                        {eventTypeOptions.map((type) => (
                          <div
                            className="flex items-center gap-3"
                            key={type.value}
                          >
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                id="event_type"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                value={type.value}
                                checked={selectedEventType === type.value}
                                onChange={() =>
                                  setselectedEventType(type.value)
                                }
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {type.label}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Category */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm">Event Category</label>
                        <Controller
                          name="event_category_id"
                          control={control}
                          rules={{
                            required: "Category is required...",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={eventCategoryOptions || []}
                              value={findSelectedOption(
                                eventCategoryOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select event category..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.event_category_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.event_category_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Meeting Link */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label className="text-sm">Meeting Link</label>
                      <input
                        type="text"
                        id="event_meet_link"
                        value={
                          selectedEventType !== "In-Person"
                            ? "https://dummy-meeting.in"
                            : ""
                        }
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Meeting link..."
                        {...register("event_meet_link", {
                          required: "Meeting link is required!",
                        })}
                        disabled={true}
                      />
                      {errors.event_meet_link && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_meet_link.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row - 2 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Event Title */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="event_title" className="text-sm">
                        Event Title
                      </label>
                      <input
                        type="text"
                        id="event_title"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="title..."
                        {...register("event_title", {
                          required: "Event title is required!",
                        })}
                      />
                      {errors.event_title && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_title.message}
                        </p>
                      )}
                    </div>

                    {/* Event Start Date */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="event_start_date" className="text-sm">
                        From
                      </label>
                      <input
                        type="datetime-local"
                        id="event_start_date"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        {...register("event_start_date", {
                          required: "Event start date is required!",
                        })}
                      />
                      {errors.event_start_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_start_date.message}
                        </p>
                      )}
                    </div>

                    {/* Event End Date */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="event_end_date" className="text-sm">
                        To
                      </label>
                      <input
                        type="datetime-local"
                        id="event_end_date"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        {...register("event_end_date", {
                          required: "Event End date is required!",
                        })}
                      />
                      {errors.event_end_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_end_date.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Description */}
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-10 flex flex-col gap-2">
                      <label htmlFor="event_description" className="text-sm">
                        Description
                      </label>
                      <textarea
                        name="event_description"
                        id="event_description"
                        rows={5}
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="event details..."
                        {...register("event_description", {
                          required: "Description is required!",
                        })}
                      />
                      {errors.event_description && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue Details Section */}
              <div className="flex flex-col gap-3 shadow-lg rounded-t-lg">
                {/* Section Title */}
                <div className="p-2 bg-gray-200 rounded-t-lg">
                  <h5 className="text-gray-600 font-bold text-xs">
                    Venue Details
                  </h5>
                </div>

                {/* Section Body */}
                <div className="p-5 py-2 pb-5 flex flex-col gap-10">
                  {/* Row - 1 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Event Organizer */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="event_organizer_id"
                          className="text-sm font-medium"
                        >
                          Organizer Name
                        </label>
                        <Controller
                          name="event_organizer_id"
                          control={control}
                          rules={{
                            required: "Organizer name is required...",
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
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select organizer name..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.event_organizer_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.event_organizer_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Event Venue */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="venue_name" className="text-sm">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        id="venue_name"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="event venue..."
                        {...register("venue_name", {
                          required: "Event venue is required!",
                        })}
                      />
                      {errors.venue_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.venue_name.message}
                        </p>
                      )}
                    </div>

                    {/* Event Country */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="event_country_id"
                          className="text-sm font-medium"
                        >
                          Country
                        </label>
                        <Controller
                          name="event_country_id"
                          control={control}
                          rules={{
                            required: "Country is required...",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryOptions || []}
                              value={findSelectedOption(
                                countryOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select country..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.event_country_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.event_country_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row - 2 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Event State */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="event_state_id"
                          className="text-sm font-medium"
                        >
                          State
                        </label>
                        <Controller
                          name="event_state_id"
                          control={control}
                          rules={{
                            required: "State is required...",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={statesOptions || []}
                              value={findSelectedOption(
                                statesOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select state..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.event_state_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.event_state_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Event City */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="event_city_id"
                          className="text-sm font-medium"
                        >
                          City
                        </label>
                        <Controller
                          name="event_city_id"
                          control={control}
                          rules={{
                            required: "City is required...",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={citiesOptions || []}
                              value={findSelectedOption(
                                citiesOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select city..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.event_city_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.event_city_id.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Zip Code/Pin Code */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="zip_code" className="text-sm">
                        Postal Code
                      </label>
                      <input
                        type="number"
                        id="zip_code"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="postal code..."
                        {...register("zip_code", {
                          required: "Event postal code is required!",
                        })}
                      />
                      {errors.zip_code && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.zip_code.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row - 3 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Event Full Address */}
                    <div className="col-span-10 flex flex-col gap-2">
                      <label htmlFor="event_address" className="text-sm">
                        Full Address
                      </label>
                      <textarea
                        name="event_address"
                        id="event_address"
                        rows={5}
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="event address..."
                        {...register("event_address", {
                          required: "Address is required!",
                        })}
                      />
                      {errors.event_address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Details Section */}
              <div className="flex flex-col gap-2 shadow-lg rounded-t-lg">
                {/* Section Title */}
                <div className="p-2 bg-gray-200 rounded-t-lg">
                  <h5 className="text-gray-600 font-bold text-xs">
                    Registration Details
                  </h5>
                </div>

                {/* Section Body */}
                <div className="p-5 py-2 pb-5 flex flex-col gap-5">
                  {/* Row - 1 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Registration Required */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <label className="text-sm">Registration Required?</label>
                      <div className="flex gap-5">
                        {registrationRequiredOptions.map((type) => (
                          <div
                            className="flex items-center gap-3"
                            key={type.value}
                          >
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                id="is_paid"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                value={type.value}
                                checked={selectedRegisterType === type.value}
                                onChange={() =>
                                  setSelectedRegisterType(type.value)
                                }
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {type.label}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Sitting */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="sitting_type"
                          className="text-sm font-medium"
                        >
                          Sitting Type
                        </label>
                        <Controller
                          name="sitting_type"
                          control={control}
                          rules={{
                            required: "Sitting type is required...",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={sittingTypeOptions || []}
                              value={findSelectedOption(
                                sittingTypeOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="Select sitting type..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.sitting_type && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.sitting_type.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Sitting Capacity */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="sitting_capacity" className="text-sm">
                        Sitting Capacity
                      </label>
                      <input
                        type="number"
                        id="sitting_capacity"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="capacity..."
                        {...register("sitting_capacity", {
                          required: "Sitting capacity is required!",
                        })}
                        disabled={selectedSittingType === "Unlimited"}
                      />
                      {errors.sitting_capacity && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sitting_capacity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row - 2 */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Event Base Price */}
                    <div className="col-span-4 flex flex-col gap-2">
                      <label htmlFor="base_ticket_price" className="text-sm">
                        Ticket Base Price
                      </label>
                      <input
                        type="number"
                        id="base_ticket_price"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="base price..."
                        {...register("base_ticket_price", {
                          required: "Ticket base price is required!",
                        })}
                      />
                      {errors.base_ticket_price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.base_ticket_price.message}
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

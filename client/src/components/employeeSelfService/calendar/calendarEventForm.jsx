import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useCallback, useState } from "react";
import { useCalendarContext } from "../../../contextApis/useEssContextFile";
import { MdOutlineClose } from "react-icons/md";

export const CalendarEventForm = () => {
  const {
    data,
    updateId,
    handleComponentView,
    handleFormClose,
    setUpdateId,
    setData,
    defaultEventType,
    showEventForm,
    handleEventForm,
    eventTypeOptions,
    setDefaultEventType,
    formSelectStyles,
    userOptions,
    dressOptions,
    findSelectedOption,
    reminderOptions,
  } = useCalendarContext();

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
    },
  });

  // Reset form function
  const resetForm = useCallback(() => {
    reset({
      user_id: null,
    });
  }, [reset]);

  // Handle Click Cancel Button
  const handleCancel = useCallback(() => {
    resetForm();
    handleFormClose();
    handleComponentView("listing");
    setData(null);
    setUpdateId(null);
  }, [resetForm, handleFormClose, handleComponentView, setData, setUpdateId]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 backdrop-blur-sm transition-all duration-[.4s] ${
          showEventForm ? "block" : "hidden"
        }`}
      ></div>

      {/* List Form */}
      <div
        className={`absolute top-[50%] start-[50%] w-[60%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 min-h-[40%] shadow-lg rounded-lg transition-all duration-[.4s]`}
      >
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex items-center justify-between">
          <h3 className="text-white text-xs font-bold">
            Add{" "}
            {(defaultEventType === "birthday" && "Birthday") ||
              (defaultEventType === "event" && "Event") ||
              (defaultEventType === "meeting" && "Meeting")}
          </h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white cursor-pointer"
            onClick={() => {
              handleEventForm();
              setDefaultEventType("birthday");
            }}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="basis-[90%] justify-around rounded-md pb-4 mx-auto">
          <form className="flex flex-col gap-10">
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="flex items-center justify-between gap-5">
                {/* Event type */}
                <div className="flex items-center gap-5">
                  {eventTypeOptions?.map((event) => {
                    return (
                      <label className="flex items-center text-sm cursor-pointer">
                        <input
                          type="radio"
                          value={event.value}
                          className="h-4 w-4 text-blue-600 cursor-pointer"
                          checked={defaultEventType === event.value}
                          onChange={() => setDefaultEventType(event.value)}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {event.label}
                        </span>
                      </label>
                    );
                  })}
                  {errors.eventType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventType.message}
                    </p>
                  )}
                </div>

                {/* Dates */}
                {/* <div className="flex justify-end gap-3">
                  <div className="flex items-center gap-2">
                    <label htmlFor="start_date" className="text-sm">
                      From
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="select date..."
                      {...register("start_date", {
                        required: "Start date is required!",
                      })}
                    />
                    {errors.start_date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="end_date" className="text-sm">
                      To
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="select date..."
                      {...register("end_date", {
                        required: "End date is required!",
                      })}
                    />
                    {errors.end_date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.end_date.message}
                      </p>
                    )}
                  </div>
                </div> */}
              </div>

              <div className="flex flex-col gap-5 h-[400px] overflow-auto">
                {/* Row-2 */}
                <div className="grid grid-cols-12 gap-5">
                  {/* Event Title */}
                  <div className="col-span-8 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="event_title" className="text-sm">
                        Title
                      </label>
                      <input
                        type="text"
                        id="event_title"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="enter title..."
                        {...register("remark", {
                          required: "Title is required!",
                        })}
                      />
                      {errors.event_title && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_title.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row-3 */}
                {defaultEventType === "birthday" && (
                  <div className="grid grid-cols-12 gap-5">
                    {/* User Name */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="created_for_user_id"
                          className="text-sm font-medium"
                        >
                          Employee Name
                        </label>
                        <Controller
                          name="created_for_user_id"
                          control={control}
                          rules={{
                            required: "User is required!",
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
                              placeholder="select employee..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.created_for_user_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.created_for_user_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {defaultEventType === "event" && (
                  <div className="grid grid-cols-12 gap-5">
                    {/* Location Name */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <label htmlFor="event_location" className="text-sm">
                        Location
                      </label>
                      <input
                        type="text"
                        id="event_location"
                        className={`rounded-lg text-[.8rem] border border-black px-3 py-2 focus:outline-none`}
                        placeholder="event location..."
                        {...register("event_location", {
                          required: "Location is required!",
                        })}
                      />
                      {errors.event_location && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.event_location.message}
                        </p>
                      )}
                    </div>

                    {/* Dress Type */}
                    <div className="col-span-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="dress_type"
                          className="text-sm font-medium"
                        >
                          Dress Type
                        </label>
                        <Controller
                          name="dress_type"
                          control={control}
                          rules={{
                            required: "Dress type is required!",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={dressOptions || []}
                              value={findSelectedOption(
                                dressOptions,
                                field.value
                              )}
                              onChange={(selected) => {
                                field.onChange(selected?.value || null);
                              }}
                              placeholder="select dress type..."
                              isClearable
                              isSearchable
                              className="react-select-container"
                              classNamePrefix="react-select"
                              styles={formSelectStyles}
                            />
                          )}
                        />
                        {errors.created_for_user_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.created_for_user_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {defaultEventType === "meeting" && (
                  <>
                    <div className="flex items-center gap-10">
                      {/* Attendees */}
                      <div className="basis-[50%] flex flex-col gap-3">
                        <label htmlFor="attendees_emails" className="text-sm">
                          Attendees Emails
                        </label>
                        <input
                          type="text"
                          id="attendees_emails"
                          className={`rounded-lg text-[.8rem] border border-black px-3 py-2 focus:outline-none`}
                          placeholder="comma seperated emails..."
                          {...register("attendees_emails", {
                            required: "attendees is required!",
                          })}
                        />
                        {errors.attendees_emails && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.attendees_emails.message}
                          </p>
                        )}
                      </div>

                      {/* Generate Meeting Link */}
                      <div className="flex flex-col gap-3 mt-[30px]">
                        <label className="flex items-center gap-3 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            id="attendees_emails"
                            className={`rounded-sm text-[.8rem] border border-black focus:outline-none`}
                            defaultChecked={true}
                          />
                          <span>Generate Google Meeting Link?</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                      {/* Meeting Agenda */}
                      <div className="col-span-10 flex flex-col gap-3">
                        <label htmlFor="meeting_agenda" className="text-sm">
                          Meeting Agenda
                        </label>
                        <textarea
                          name="meeting_agenda"
                          id="meeting_agenda"
                          className={`rounded-lg text-[.8rem] border border-black px-3 py-2 focus:outline-none`}
                          placeholder="meeting agenda..."
                          {...register("meeting_agenda", {
                            required: "Agenda is required!",
                          })}
                        />
                        {errors.meeting_agenda && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.meeting_agenda.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Row-4 */}
                <div className="grid grid-cols-12 gap-5">
                  {/* Desription */}
                  <div className="col-span-10 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="description" className="text-sm">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        className={`rounded-lg text-[.8rem] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="description here..."
                        {...register("description", {
                          required: "Description is required!",
                        })}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row-5 */}
                <div className="flex items-center gap-5">
                  {/* Reminder Options */}
                  <div className="flex flex-col gap-3">
                    <Controller
                      name="set_reminder"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={reminderOptions || []}
                          value={findSelectedOption(
                            reminderOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || null);
                          }}
                          placeholder="set reminder..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={formSelectStyles}
                        />
                      )}
                    />
                  </div>

                  {/* Is Repeated? */}
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      id="is_repeated_anually"
                      className={`rounded-sm text-[.8rem] border border-black focus:outline-none`}
                      {...register("remark")}
                    />
                    <label htmlFor="is_repeated_anually" className="text-sm">
                      Is Repeated Annually?
                    </label>
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
                onClick={handleEventForm}
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

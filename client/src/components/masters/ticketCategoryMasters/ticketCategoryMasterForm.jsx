import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import {
  createTicketCategory,
  updateTicketCategory,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTicketCategoryMasterContext } from "../../../contextApis/useMastersContextFile";
import { useSelector } from "react-redux";

export const TicketCategoryMasterForm = ({ onClose }) => {
  const { activeEntity } = useSelector((state) => state.auth);
  const {
    selectStyles,
    formVisibility,
    formType,
    getAllData,
    updateId,
    data,
    setUpdateId,
    priorityOptions,
  } = useTicketCategoryMasterContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ticket_category_name: "",
      ticket_category_priority: null,
      ticket_category_description: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      const setUpdateDefaultData = () => {
        setValue("ticket_category_name", data?.ticket_category_name || "");
        setValue(
          "ticket_category_description",
          data?.ticket_category_description || ""
        );

        if (priorityOptions.length > 0) {
          const priorityOption = priorityOptions?.find(
            (item) => item.value === data?.ticket_category_priority
          );
          setValue("ticket_category_priority", priorityOption || null);
        } else {
          setValue("ticket_category_priority", null);
        }
      };
      setUpdateDefaultData();
    } else {
      // Reset form when opening in Add mode
      reset({
        ticket_category_name: "",
        ticket_category_description: "",
        ticket_category_priority: null,
      });
    }
  }, [formType, updateId, data, setValue, priorityOptions, reset]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      ticket_category_name: "",
      ticket_category_description: "",
      ticket_category_priority: null,
    });
    onClose();
    setUpdateId(null);
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        ticket_category_name: formData?.ticket_category_name || "",
        ticket_category_priority:
          formData?.ticket_category_priority?.value || "",
        ticket_category_description:
          formData?.ticket_category_description || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateTicketCategory(activeEntity, updateId, payload);
      } else {
        response = await createTicketCategory(activeEntity, payload);
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add"
              ? "Add Ticket Category"
              : "Update Ticket Category"}
          </h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={() => {
              handleFormClose();
            }}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-full mx-auto p-10">
          <form
            className="flex flex-col gap-4 w-[80%] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Category Name */}
              <div className="col-span-6 flex flex-col gap-2">
                <label htmlFor="ticket_category_name" className="text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="ticket_category_name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter category name"
                  {...register("ticket_category_name", {
                    required: "Category Name is required!",
                  })}
                />
                {errors.ticket_category_name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.ticket_category_name.message}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div className="col-span-6 flex flex-col gap-2">
                <label htmlFor="ticket_category_priority" className="text-sm">
                  Priority
                </label>
                <Controller
                  name="ticket_category_priority"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={priorityOptions}
                      value={field.value}
                      onChange={(selected) => field.onChange(selected)}
                      onBlur={field.onBlur}
                      placeholder="Select priority"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.ticket_category_priority && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.ticket_category_priority.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 flex flex-col gap-2">
                <label
                  htmlFor="ticket_category_description"
                  className="text-sm"
                >
                  Description
                </label>
                <textarea
                  name="ticket_category_description"
                  id="ticket_category_description"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter description"
                  {...register("ticket_category_description", {
                    required: "Description is required!",
                  })}
                />
                {errors.ticket_category_description && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.ticket_category_description.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover">
                {formType === "Add" ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createEventCategory,
  updateEventCategory,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useEventCategoryMasterContext } from "../../../contextApis/useMastersContextFile";

export const EventCategoryMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useEventCategoryMasterContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Set default empty values
      event_category_name: "",
      event_category_description: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        event_category_name:
          data?.event_category_name || data[0]?.event_category_name || "",
        event_category_description:
          data.event_category_description ||
          data[0]?.event_category_description ||
          "",
      });
    } else {
      reset({ event_category_name: "", event_category_description: "" });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      event_category_name: "",
      event_category_description: "",
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        event_category_name: formData.event_category_name || "",
        event_category_description: formData.event_category_description || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateEventCategory(updateId, payload);
      } else {
        response = await createEventCategory(payload);
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
              ? "Add Event Category"
              : "Update Event Category"}
          </h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={onClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-full mx-auto p-10">
          <form
            className="flex flex-col gap-4 w-[70%] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="event_category_name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="event_category_name"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter category name"
                {...register("event_category_name", {
                  required: "Category Name is required!",
                })}
              />
              {errors.event_category_name && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.event_category_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="event_category_description" className="text-sm">
                Description
              </label>
              <textarea
                name="event_category_description"
                id="event_category_description"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter description"
                {...register("event_category_description", {
                  required: "Description is required!",
                })}
              />
              {errors.event_category_description && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.event_category_description.message}
                </p>
              )}
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

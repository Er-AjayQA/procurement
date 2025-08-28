import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
import {
  createService,
  getAllServiceCategory,
  updateService,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useServiceMasterContext } from "../../../contextApis/useMastersContextFile";

export const ServiceMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useServiceMasterContext();

  const [serviceCategoryOptions, setServiceCategoryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mvp: "",
      bar_code_type: { value: 0, label: "No" },
      manage_by: { value: "Batch", label: "Batch" },
      item_desc: "",
      threshold_stock: 0,
      item_type: { value: "Item", label: "Item" },
      item_category_id: null,
      uom_id: null,
    },
  });

  // Get All Service Category List
  const getAllCategoryList = async () => {
    try {
      const response = await getAllServiceCategory({
        limit: 5000,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setServiceCategoryOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      }
    } catch (error) {
      toast.error("Failed to load Service categories");
    }
  };

  // Set form values when in update mode
  useEffect(() => {
    const initializeForm = async () => {
      setIsLoading(true);
      try {
        // Load options if not already loaded
        if (serviceCategoryOptions.length === 0) await getAllCategoryList();

        if (formType === "Update" && data) {
          const formData = Array.isArray(data) ? data[0] : data;

          reset({
            name: formData.name || "",
            mvp: formData.mvp || "",
            service_desc: formData.service_desc || "",
          });

          // Set Category
          if (formData.service_category_id) {
            const categoryOption = serviceCategoryOptions.find(
              (category) => category.value === formData.service_category_id
            );
            if (categoryOption) setValue("service_category_id", categoryOption);
          }
        } else {
          reset({
            name: "",
            mvp: "",
            service_desc: "",
            service_category_id: null,
          });
        }
      } catch (error) {
        console.error("Error initializing form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeForm();
  }, [formType, data, reset]);

  // Handle Form Close
  const handleFormClose = () => {
    reset();
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        mvp: Number(formData.mvp),
        service_desc: formData.service_desc || "",
        service_category_id: formData.service_category_id?.value,
      };

      let response;
      if (formType === "Update") {
        response = await updateService(updateId, payload);
      } else {
        response = await createService(payload);
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
      console.error(error);
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      borderRadius: "0.5rem",
      borderColor: "rgb(78, 79, 80)",
      fontSize: "12px",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.8rem",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "3px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "2px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    input: (base) => ({
      ...base,
      margin: "0px",
      paddingBottom: "0px",
      paddingTop: "0px",
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.8rem",
    }),
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 max-h-[80vh] shadow-lg rounded-lg transition-all duration-[.4s] origin-top flex flex-col ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        {/* Fixed Header */}
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Service" : "Update Service"}
          </h3>
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={handleFormClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-10 py-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-5">
              {/* Service Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="service_category_id" className="text-sm">
                  Service Category <span className="text-red-700">*</span>
                </label>
                <Controller
                  name="service_category_id"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={serviceCategoryOptions}
                      value={serviceCategoryOptions?.find(
                        (opt) =>
                          opt.value === field.value?.value ||
                          opt.value === field.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      placeholder="Select category"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.service_category_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.service_category_id.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter name"
                  {...register("name", {
                    required: "Name is required!",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-5">
              {/* MVP */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mvp" className="text-sm">
                  MVP <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  id="mvp"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter mvp"
                  {...register("mvp", {
                    required: "MVP is required!",
                    min: { value: 0, message: "MVP must be positive" },
                  })}
                />
                {errors.mvp && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.mvp.message}
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="service_desc" className="text-sm">
                  Description <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="service_desc"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter description..."
                  {...register("service_desc", {
                    required: "Description is required!",
                  })}
                />
                {errors.service_desc && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.service_desc.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-red-500 px-5 py-2 rounded-md text-xs text-white hover:bg-red-600 mr-3"
                onClick={handleFormClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover"
              >
                {formType === "Add" ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

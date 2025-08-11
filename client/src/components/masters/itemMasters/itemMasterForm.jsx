import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
import {
  createArea,
  getAllItemCategory,
  getAllUom,
  updateArea,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useItemMasterContext } from "../../../contextApis/useMastersContextFile";

export const ItemMasterForm = ({ onClose }) => {
  const {
    formVisibility,
    formType,
    getAllData,
    updateId,
    data,
    styledComponent,
  } = useItemMasterContext();

  const [barCodeOptions, setBarCodeOptions] = useState([
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ]);
  const [manageByOptions, setManageByOptions] = useState([
    { value: "Batch", label: "Batch" },
    { value: "Serial", label: "Serial" },
  ]);
  const [itemTypeOptions, setItemTypeOptions] = useState([
    { value: "Item", label: "Item" },
    { value: "Assets", label: "Assets" },
  ]);

  const [itemCategoryOptions, setItemCategoryOptions] = useState(null);
  const [uomOptions, setUomOptions] = useState(null);

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
      name: "",
      department_head_id: "",
      dept_head_name: "",
    },
  });

  // Get All Item Category List
  const getAllCategoryList = async () => {
    try {
      const response = await getAllItemCategory({
        limit: 5000,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setItemCategoryOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      } else {
        setItemCategoryOptions(null);
      }
    } catch (error) {
      setItemCategoryOptions(null);
    }
  };

  // Get All UOM List
  const getAllUomList = async () => {
    try {
      const response = await getAllUom({
        limit: 5000,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setUomOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      } else {
        setUomOptions(null);
      }
    } catch (error) {
      setUomOptions(null);
    }
  };

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        name: data.name || data[0]?.name || "",
      });

      const setDepartmentDropdown = async () => {
        try {
          if (data[0].bar_code_type) {
            const departmentOption = barCodeOptions.find(
              (code) => code.label === data[0].bar_code_type
            );

            if (departmentOption) {
              setValue("dept_id", departmentOption);
            }
          }
        } catch (error) {
          console.error("Error setting dropdown options:", error);
        }
      };

      setDepartmentDropdown();
    } else {
      reset({ name: "", dept_id: "" });
    }
  }, [formType, data, reset, setValue, barCodeOptions]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      name: "",
      dept_id: null,
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name || "",
        dept_id: formData.dept_id?.value || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateArea(updateId, payload);
      } else {
        response = await createArea(payload);
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

  useEffect(() => {
    getAllCategoryList();
    getAllUomList();
  }, []);

  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      borderRadius: "0.5rem",
      borderColor: "rgb(78, 79, 80)",
      fontSize: "0.8rem",
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

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[70%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Item" : "Update Item"}
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
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-5">
              {/* Item Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="item_category_id" className="text-sm">
                  Item Category
                </label>
                <Controller
                  name="item_category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={itemCategoryOptions}
                      placeholder="Select category"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      {...register("item_category_id", {
                        required: "Category is required!",
                      })}
                    />
                  )}
                />
                {errors.item_category_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.item_category_id.message}
                  </p>
                )}
              </div>
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  Name
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
              {/* MVP */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mvp" className="text-sm">
                  MVP
                </label>
                <input
                  type="number"
                  id="mvp"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter mvp"
                  {...register("mvp", {
                    required: "MVP is required!",
                  })}
                />
                {errors.mvp && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.mvp.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-5">
              {/* Bar Code Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="bar_code_type" className="text-sm">
                  Bar Available?
                </label>
                <Controller
                  name="bar_code_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={barCodeOptions}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.bar_code_type && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.bar_code_type.message}
                  </p>
                )}
              </div>
              {/* Manage By Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="bar_code_type" className="text-sm">
                  Manage By
                </label>
                <Controller
                  name="bar_code_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={manageByOptions}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      {...register("bar_code_type", {
                        required: "Bar Code Type is required!",
                      })}
                    />
                  )}
                />
                {errors.bar_code_type && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.bar_code_type.message}
                  </p>
                )}
              </div>
              {/* Threshold Stock */}
              <div className="flex flex-col gap-2">
                <label htmlFor="threshold_stock" className="text-sm">
                  Stock Threshold
                </label>
                <input
                  type="number"
                  id="threshold_stock"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter threshold value"
                  {...register("threshold_stock", {
                    required: "Threshold is required!",
                  })}
                />
                {errors.threshold_stock && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.threshold_stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-5">
              {/* Item Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="item_type" className="text-sm">
                  Item Type
                </label>
                <Controller
                  name="item_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={itemTypeOptions}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      {...register("item_type", {
                        required: "Item Type is required!",
                      })}
                    />
                  )}
                />
                {errors.item_type && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.item_type.message}
                  </p>
                )}
              </div>
              {/* UOM */}
              <div className="flex flex-col gap-2">
                <label htmlFor="uom_id" className="text-sm">
                  UOM
                </label>
                <Controller
                  name="uom_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={uomOptions}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      {...register("uom_id", {
                        required: "Uom is required!",
                      })}
                    />
                  )}
                />
                {errors.uom_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.uom_id.message}
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

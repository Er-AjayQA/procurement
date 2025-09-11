import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdOutlineClose, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import {
  createItem,
  updateItem,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useItemMasterContext } from "../../../contextApis/useMastersContextFile";
import { useSelector } from "react-redux";

export const ItemMasterForm = ({ onClose }) => {
  const { activeEntity } = useSelector((state) => state.auth);
  const {
    itemCategoryOptions,
    uomOptions,
    formVisibility,
    formType,
    getAllData,
    updateId,
    data,
    selectStyles,
    getAllCategoryList,
    getAllUomList,
  } = useItemMasterContext();

  const [barCodeOptions] = useState([
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ]);
  const [manageByOptions] = useState([
    { value: "Batch", label: "Batch" },
    { value: "Serial", label: "Serial" },
  ]);
  const [itemTypeOptions] = useState([
    { value: "Item", label: "Item" },
    { value: "Assets", label: "Assets" },
  ]);

  const [specifications, setSpecifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);

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

  // Set form values when in update mode
  useEffect(() => {
    const initializeForm = async () => {
      setIsLoading(true);

      // Load options if not already loaded
      if (itemCategoryOptions.length === 0 || uomOptions.length === 0) {
        setIsOptionsLoading(true);
        await Promise.all([
          getAllCategoryList(activeEntity),
          getAllUomList(activeEntity),
        ]);
        setIsOptionsLoading(false);
      }

      // Wait for options to load before setting values in update mode
      if (formType === "Update" && data && !isOptionsLoading) {
        setValue("name", data?.name);
        setValue("mvp", data?.mvp);
        setValue(
          "bar_code_type",
          barCodeOptions.find((opt) => opt.value === data?.bar_code_type) ||
            barCodeOptions[1]
        );
        setValue(
          "manage_by",
          manageByOptions.find((opt) => opt.value === data?.manage_by) ||
            manageByOptions[0]
        );
        setValue("item_desc", data?.item_desc);
        setValue("threshold_stock", data?.threshold_stock);
        setValue(
          "item_type",
          itemTypeOptions.find((opt) => opt.value === data?.item_type) ||
            itemTypeOptions[0]
        );

        // Set Category
        if (data?.item_category_id) {
          const categoryOption = itemCategoryOptions.find(
            (category) => category.value === data?.item_category_id
          );
          if (categoryOption) setValue("item_category_id", categoryOption);
        }

        // Set UOM
        if (data?.uom_id) {
          const uomOption = uomOptions.find(
            (uom) => uom.value === data?.uom_id
          );
          if (uomOption) setValue("uom_id", uomOption);
        }

        setSpecifications(data?.specifications || []);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    initializeForm();
  }, [
    formType,
    data,
    setValue,
    isOptionsLoading,
    itemCategoryOptions,
    uomOptions,
  ]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      name: "",
      mvp: "",
      bar_code_type: barCodeOptions[1],
      manage_by: manageByOptions[0],
      item_desc: "",
      threshold_stock: 0,
      item_type: itemTypeOptions[0],
      item_category_id: null,
      uom_id: null,
    });

    setSpecifications([]);
    onClose();
  };

  // Handle Add Specifications
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { type: "", description: "" }]);
  };

  // Handle Remove Specification Row
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...specifications];
    updatedSpecs.splice(index, 1);
    setSpecifications(updatedSpecs);
  };

  // Handle Specification Change
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        mvp: Number(formData.mvp),
        bar_code_type: formData.bar_code_type?.value || false,
        manage_by: formData.manage_by?.value || "Batch",
        item_desc: formData.item_desc || "",
        threshold_stock: Number(formData.threshold_stock),
        item_type: formData.item_type?.value || "Item",
        item_category_id: formData.item_category_id?.value,
        uom_id: formData.uom_id?.value,
        specifications: specifications.filter(
          (spec) => spec.type && spec.description
        ),
      };

      let response;
      if (formType === "Update") {
        response = await updateItem(activeEntity, updateId, payload);
      } else {
        response = await createItem(activeEntity, payload);
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData(activeEntity);
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error(error);
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
        className={`absolute top-0 start-[50%] w-[70%] translate-x-[-50%] bg-white z-30 max-h-[80vh] shadow-lg rounded-lg transition-all duration-[.4s] origin-top flex flex-col ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        {/* Fixed Header */}
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Item" : "Update Item"}
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
            <div className="grid grid-cols-3 gap-5">
              {/* Item Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="item_category_id" className="text-sm">
                  Item Category <span className="text-red-700">*</span>
                </label>
                <Controller
                  name="item_category_id"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={itemCategoryOptions}
                      value={itemCategoryOptions.find(
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
                {errors.item_category_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.item_category_id.message}
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
                      value={barCodeOptions.find(
                        (opt) =>
                          opt.value === field.value?.value ||
                          opt.value === field.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
              </div>

              {/* Manage By */}
              <div className="flex flex-col gap-2">
                <label htmlFor="manage_by" className="text-sm">
                  Manage By
                </label>
                <Controller
                  name="manage_by"
                  control={control}
                  rules={{ required: "Manage by is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={manageByOptions}
                      value={manageByOptions.find(
                        (opt) =>
                          opt.value === field.value?.value ||
                          opt.value === field.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.manage_by && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.manage_by.message}
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
                    min: { value: 0, message: "Threshold must be positive" },
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
                      value={itemTypeOptions.find(
                        (opt) =>
                          opt.value === field.value?.value ||
                          opt.value === field.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
              </div>

              {/* UOM */}
              <div className="flex flex-col gap-2">
                <label htmlFor="uom_id" className="text-sm">
                  UOM <span className="text-red-700">*</span>
                </label>
                <Controller
                  name="uom_id"
                  control={control}
                  rules={{ required: "UOM is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={uomOptions}
                      value={uomOptions.find(
                        (opt) =>
                          opt.value === field.value?.value ||
                          opt.value === field.value
                      )}
                      onChange={(selected) => field.onChange(selected)}
                      placeholder="Select.."
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.uom_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.uom_id.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="item_desc" className="text-sm">
                  Description
                </label>
                <input
                  type="text"
                  id="item_desc"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter description"
                  {...register("item_desc")}
                />
              </div>
            </div>

            {/* Specifications Section */}
            <div className="mt-5">
              <div className="flex justify-between bg-button-hover py-2 px-2 rounded-t-md">
                <h3 className="text-white text-xs font-bold">
                  Add Specifications
                </h3>
                <IoMdAdd
                  className="fill-white cursor-pointer"
                  onClick={handleAddSpecification}
                />
              </div>

              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex w-full border-b border-b-gray-500"
                >
                  <div className="basis-[40%] p-3 border-e border-e-gray-500">
                    <input
                      type="text"
                      value={spec.type}
                      onChange={(e) =>
                        handleSpecificationChange(index, "type", e.target.value)
                      }
                      placeholder="Enter title"
                      className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    />
                  </div>
                  <div className="basis-[40%] p-3 border-e border-e-gray-500">
                    <input
                      type="text"
                      value={spec.description}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Enter description..."
                      className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    />
                  </div>
                  <div className="flex justify-center items-center basis-[20%] p-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(index)}
                    >
                      <MdDelete className="hover:fill-red-500 text-xl" />
                    </button>
                  </div>
                </div>
              ))}
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

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
import {
  createArea,
  getAllDepartments,
  updateArea,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAreaMasterContext } from "../../../contextApis/useMastersContextFile";
import { useSelector } from "react-redux";

export const AreaMasterForm = ({ onClose }) => {
  const { activeEntity } = useSelector((state) => state.auth);
  const {
    departmentOptions,
    getAllDepartmentList,
    formVisibility,
    formType,
    getAllData,
    updateId,
    data,
  } = useAreaMasterContext();

  const [isDepartmentOptionsLoading, setIsDepartmentOptionsLoading] =
    useState(false);

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
      dept_id: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    const setFormValues = async () => {
      if (formType === "Update" && data) {
        reset({
          name: data.name || data[0].name || "",
        });

        // If department options aren't loaded yet, fetch them
        if (!departmentOptions) {
          setIsDepartmentOptionsLoading(true);
          await getAllDepartmentList(activeEntity);
          setIsDepartmentOptionsLoading(false);
        }

        // Set department dropdown value
        const deptId = data.dept_id || data[0]?.dept_id;

        if (deptId && departmentOptions) {
          const departmentOption = departmentOptions.find(
            (option) => option.value === String(deptId)
          );

          if (departmentOption) {
            setValue("dept_id", departmentOption);
          }
        }
      } else {
        reset({ name: "", dept_id: null });
      }
    };

    setFormValues();
  }, [
    formType,
    data,
    reset,
    setValue,
    departmentOptions,
    activeEntity,
    getAllDepartmentList,
  ]);

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
        response = await updateArea(activeEntity, updateId, payload);
      } else {
        response = await createArea(activeEntity, payload);
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
      throw new Error(error.message);
    }
  };

  // Get All Departments on Page Load
  useEffect(() => {
    if (activeEntity) {
      getAllDepartmentList(activeEntity);
    }
  }, [activeEntity]);

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
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Area" : "Update Area"}
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
        <div className="w-[50%] absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter area name"
                {...register("name", {
                  required: "Area Name is required!",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dept_id" className="text-sm">
                Department
              </label>
              <Controller
                name="dept_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={departmentOptions}
                    placeholder="Select department"
                    isClearable
                    isSearchable
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={selectStyles}
                  />
                )}
              />
              {errors.dept_id && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.dept_id.message}
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

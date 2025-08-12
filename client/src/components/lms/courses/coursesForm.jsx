import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import {
  createArea,
  updateArea,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";
import { IoMdAdd } from "react-icons/io";

export const CoursesForm = ({ onClose }) => {
  const {
    formVisibility,
    formType,
    getAllData,
    updateId,
    data,
    categoryOptions,
  } = useCoursesMasterContext();
  const [certificateOptions, setCertificateOptions] = useState([
    { value: true, label: "Provided" },
    { value: false, label: "Not-Provided" },
  ]);
  const [formatOptions, setFormatOptions] = useState([
    { value: "Live", label: "Live" },
    { value: "Offline", label: "Offline" },
    { value: "Online", label: "Online" },
  ]);
  const [contents, setContents] = useState([]);

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

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        name: data.name || data[0]?.name || "",
      });
    } else {
      reset({ name: "", dept_id: "" });
    }
  }, [formType, data, reset, setValue]);

  // Handle Add Content
  const handleAddContent = () => {
    setContents([
      ...contents,
      { content_type: "", content_name: "", content_link: "" },
    ]);
  };

  // Handle Content Change
  const handleContentChange = () => {};

  // Handle Remove Content
  const handleRemoveContent = () => {};

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
      <div className={`bg-white z-30 h-full shadow-lg rounded-lg `}>
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex justify-between items-center">
          <h3 className="text-white text-xs font-bold">
            {formType === "Add" ? "Add Course" : "Update Course"}
          </h3>
        </div>

        {/* Form */}
        <div className="p-5">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Course Type Selection */}
            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="common_course"
                  name="course_type"
                  className="border-black"
                />
                <label htmlFor="common_course" className="text-sm font-bold">
                  Common Content Course
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="assessment_course"
                  name="course_type"
                  className="border-black"
                />
                <label
                  htmlFor="assessment_course"
                  className="text-sm font-bold"
                >
                  Course With Assessment
                </label>
              </div>
            </div>

            {/* Course Form */}
            <div className="p-3 h-[400px] overflow-y-auto scrollbar-hide flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                {/* GRID 1 */}
                <div className="flex flex-col gap-3 px-5 border-e border-e-gray-300">
                  {/* Course Category */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="course_category_id" className="text-sm">
                      Category <span className="text-red-700">*</span>
                    </label>
                    <Controller
                      name="course_category_id"
                      control={control}
                      rules={{ required: "Category is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={categoryOptions}
                          value={categoryOptions.find(
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

                  {/* Course Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="course_name" className="text-sm">
                      Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="course_name"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter course name"
                      {...register("course_name", {
                        required: "Course Name is required!",
                      })}
                    />
                    {errors.course_name && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.course_name.message}
                      </p>
                    )}
                  </div>

                  {/* Course Trainer */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="course_trainer" className="text-sm">
                      Trainer Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="course_trainer"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter trainer name"
                      {...register("course_trainer", {
                        required: "Trainer Name is required!",
                      })}
                    />
                    {errors.course_trainer && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.course_trainer.message}
                      </p>
                    )}
                  </div>

                  {/* Course Format */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="course_format" className="text-sm">
                      Course Format
                    </label>
                    <Controller
                      name="course_format"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={formatOptions}
                          value={formatOptions.find(
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
                </div>

                {/* GRID 2 */}
                <div className="flex flex-col gap-3 px-5">
                  {/* Course Objective */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="course_objective" className="text-sm">
                      Objective <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="course_objective"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter course objective...."
                      {...register("course_objective", {
                        required: "Objective is required!",
                      })}
                    />
                    {errors.course_objective && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.course_objective.message}
                      </p>
                    )}
                  </div>

                  {/* Course Expected Results */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="course_expected_results"
                      className="text-sm"
                    >
                      Expected Results <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="course_expected_results"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter expected results...."
                      {...register("course_expected_results", {
                        required: "Expected results is required!",
                      })}
                    />
                    {errors.course_expected_results && (
                      <p className="text-red-500 text-[.7rem]">
                        {errors.course_expected_results.message}
                      </p>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="is_certified" className="text-sm">
                      Certificate Provided?
                    </label>
                    <Controller
                      name="is_certified"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={certificateOptions}
                          value={certificateOptions.find(
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
                </div>
              </div>

              {/* Content Section */}
              <div className="mt-5 px-5">
                <div className="flex justify-between bg-button-hover py-2 px-2 rounded-t-md">
                  <h3 className="text-white text-xs font-bold">Add Content</h3>
                  <IoMdAdd
                    className="fill-white cursor-pointer"
                    onClick={handleAddContent}
                  />
                </div>

                {contents.map((content, index) => (
                  <div
                    key={index}
                    className="flex w-full border-b border-b-gray-500"
                  >
                    <div className="basis-[40%] p-3 border-e border-e-gray-500">
                      <select
                        name="content_type"
                        id="content_type"
                        onChange={(e) =>
                          handleContentChange(index, "type", e.target.value)
                        }
                        className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      >
                        <option value="">--type--</option>
                        <option value="pdf">PDF</option>
                        <option value="xlsx">Excel</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                    <div className="basis-[40%] p-3 border-e border-e-gray-500">
                      <input
                        type="text"
                        value={content.content_name}
                        onChange={(e) =>
                          handleContentChange(index, "name", e.target.value)
                        }
                        placeholder="File name"
                        className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      />
                    </div>
                    <div className="basis-[40%] p-3 border-e border-e-gray-500">
                      <input
                        type="text"
                        value={content.content_link}
                        onChange={(e) =>
                          handleContentChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Enter link..."
                        className="w-full rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      />
                    </div>
                    <div className="flex justify-center items-center basis-[20%] p-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveContent(index)}
                      >
                        <MdDelete className="hover:fill-red-500 text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Containers */}
              <div className="mt-auto flex items-center justify-end">
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 rounded-md text-xs text-white hover:bg-red-600 mr-3"
                  onClick={handleFormClose}
                >
                  Cancel
                </button>
                <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover">
                  {formType === "Add" ? "Create" : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

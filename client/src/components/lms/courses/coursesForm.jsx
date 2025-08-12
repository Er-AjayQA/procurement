import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { MdClose, MdDelete, MdOutlineClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";

// Content Form Component
const ContentItem = ({ content, index, onChange, onRemove }) => {
  return (
    <div className="flex w-full border-b border-b-gray-300">
      <div className="basis-[40%] p-3 border-e border-e-gray-300">
        <select
          name="content_type"
          value={content.content_type}
          onChange={(e) => onChange(index, "content_type", e.target.value)}
          className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
          required
        >
          <option value="">Select type</option>
          <option value="PDF">PDF</option>
          <option value="Image">Image</option>
          <option value="Video">Video</option>
          <option value="Word Document">Word Document</option>
          <option value="Excel Sheet">Excel Sheet</option>
          <option value="Audio">Audio</option>
        </select>
      </div>
      <div className="basis-[40%] p-3 border-e border-e-gray-300">
        <input
          type="text"
          value={content.content_name}
          onChange={(e) => onChange(index, "content_name", e.target.value)}
          placeholder="File name"
          className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
          required
        />
      </div>
      <div className="basis-[40%] p-3 border-e border-e-gray-300">
        <input
          type="url"
          value={content.content_link}
          onChange={(e) => onChange(index, "content_link", e.target.value)}
          placeholder="Enter link..."
          className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
        />
      </div>
      <div className="flex justify-center items-center basis-[20%] p-3">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <MdDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const QuestionForm = ({
  isVisible,
  onClose,
  questionType,
  setQuestionType,
  register,
  errors,
  control,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-blue-600 py-3 px-4">
          <h3 className="text-white font-medium">Add Question</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            <MdOutlineClose className="text-white text-lg" />
          </button>
        </div>
        <form className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="assessment_question_type"
              control={control}
              rules={{ required: "Question type is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "MCQ", label: "MCQ" },
                    { value: "true/false", label: "True/False" },
                  ]}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    setQuestionType(val.value);
                  }}
                  placeholder="Select question type"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "40px",
                      borderRadius: "0.375rem",
                      borderColor: errors.assessment_question_type
                        ? "#ef4444"
                        : "#d1d5db",
                    }),
                  }}
                />
              )}
            />
            {errors.assessment_question_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assessment_question_type.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full rounded-md border ${
                errors.assessment_question_title
                  ? "border-red-500"
                  : "border-gray-300"
              } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter question"
              {...register("assessment_question_title", {
                required: "Question is required",
              })}
            />
            {errors.assessment_question_title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assessment_question_title.message}
              </p>
            )}
          </div>

          {questionType === "MCQ" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Options <span className="text-red-500">*</span>
              </label>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correct_option"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Option ${num}`}
                  />
                </div>
              ))}
            </div>
          )}

          {questionType === "true/false" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Correct Answer <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correct_answer"
                    value="true"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">True</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correct_answer"
                    value="false"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">False</span>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Main Form Component
export const CoursesForm = ({ onClose }) => {
  const { formType, getAllData, updateId, data, categoryOptions } =
    useCoursesMasterContext();

  const [courseType, setCourseType] = useState("commonContent");
  const [contents, setContents] = useState([]);
  const [questionFormVisible, setQuestionFormVisible] = useState(false);
  const [questionType, setQuestionType] = useState("MCQ");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course_name: "",
      course_category_id: null,
      course_trainer: "",
      course_format: null,
      course_objective: "",
      course_expected_results: "",
      is_certified: null,
      assessment_name: "",
      marks_per_question: "",
      assessment_passing_percent: "",
      assessment_time: "",
      assessment_max_attempts: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      const formData = {
        ...data,
        course_category_id: categoryOptions.find(
          (opt) => opt.value === data.course_category_id
        ),
        course_format: data.course_format
          ? { value: data.course_format, label: data.course_format }
          : null,
        is_certified: data.is_certified
          ? { value: true, label: "Provided" }
          : { value: false, label: "Not-Provided" },
      };
      reset(formData);
      if (data.courseContent) setContents(data.courseContent);
    }
  }, [formType, data, reset, categoryOptions]);

  const handleAddContent = () => {
    setContents([
      ...contents,
      { content_type: "", content_name: "", content_link: "" },
    ]);
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...contents];
    updated[index][field] = value;
    setContents(updated);
  };

  const handleRemoveContent = (index) => {
    const updated = contents.filter((_, i) => i !== index);
    setContents(updated);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        course_type: courseType,
        course_name: formData.course_name,
        course_category_id: formData.course_category_id.value,
        course_trainer: formData.course_trainer,
        course_format: formData.course_format?.value,
        course_objective: formData.course_objective,
        course_expected_results: formData.course_expected_results,
        is_certified: formData.is_certified?.value,
        courseContent: contents,
      };

      if (courseType === "contentWithAssessment") {
        payload.assessment_name = formData.assessment_name;
        payload.marks_per_question = Number(formData.marks_per_question);
        payload.assessment_passing_percent = Number(
          formData.assessment_passing_percent
        );
        payload.assessment_time = Number(formData.assessment_time);
        payload.assessment_max_attempts = Number(
          formData.assessment_max_attempts
        );
        // Add questions data here when implemented
      }

      console.log("Submitting:", payload);

      // Here you would call your API
      // let response;
      // if (formType === "Update") {
      //   response = await updateCourse(updateId, payload);
      // } else {
      //   response = await createCourse(payload);
      // }

      // For now, just log and show success
      toast.success(
        formType === "Update"
          ? "Course updated successfully!"
          : "Course created successfully!"
      );
      onClose();
      getAllData();
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error("Submission error:", error);
    }
  };

  const selectStyles = {
    control: (base, { isDisabled, isFocused }) => ({
      ...base,
      minHeight: "40px",
      borderRadius: "0.375rem",
      borderColor: isDisabled
        ? "#e5e7eb"
        : isFocused
        ? "#3b82f6"
        : errors[base.name]
        ? "#ef4444"
        : "#d1d5db",
      boxShadow: isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: isDisabled ? "#e5e7eb" : "#9ca3af",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: "0 4px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#3b82f6" : "white",
      color: isSelected ? "white" : "#111827",
      "&:hover": {
        backgroundColor: isSelected ? "#3b82f6" : "#f3f4f6",
      },
    }),
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 py-3 px-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            {formType === "Add" ? "Add New Course" : "Update Course"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Course Type <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  value="commonContent"
                  checked={courseType === "commonContent"}
                  onChange={() => setCourseType("commonContent")}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Common Content Course
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  value="contentWithAssessment"
                  checked={courseType === "contentWithAssessment"}
                  onChange={() => setCourseType("contentWithAssessment")}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Course With Assessment
                </span>
              </label>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="space-y-4">
            <div className="bg-gray-100 py-2 px-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-700">
                Course Basic Details
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Course Category */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="course_category_id"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categoryOptions}
                        placeholder="Select category"
                        styles={selectStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                  {errors.course_category_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_category_id.message}
                    </p>
                  )}
                </div>

                {/* Course Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-md border ${
                      errors.course_name ? "border-red-500" : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter course name"
                    {...register("course_name", {
                      required: "Course name is required",
                    })}
                  />
                  {errors.course_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_name.message}
                    </p>
                  )}
                </div>

                {/* Course Trainer */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-md border ${
                      errors.course_trainer
                        ? "border-red-500"
                        : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter trainer name"
                    {...register("course_trainer", {
                      required: "Trainer name is required",
                    })}
                  />
                  {errors.course_trainer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_trainer.message}
                    </p>
                  )}
                </div>

                {/* Course Format */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Course Format
                  </label>
                  <Controller
                    name="course_format"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: "Live", label: "Live" },
                          { value: "Offline", label: "Offline" },
                          { value: "Online", label: "Online" },
                        ]}
                        placeholder="Select format"
                        styles={selectStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Course Objective */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Objective <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full rounded-md border ${
                      errors.course_objective
                        ? "border-red-500"
                        : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter course objective"
                    {...register("course_objective", {
                      required: "Objective is required",
                    })}
                  />
                  {errors.course_objective && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_objective.message}
                    </p>
                  )}
                </div>

                {/* Expected Results */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Results <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full rounded-md border ${
                      errors.course_expected_results
                        ? "border-red-500"
                        : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter expected results"
                    {...register("course_expected_results", {
                      required: "Expected results are required",
                    })}
                  />
                  {errors.course_expected_results && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_expected_results.message}
                    </p>
                  )}
                </div>

                {/* Certificate */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Certificate Provided?
                  </label>
                  <Controller
                    name="is_certified"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: true, label: "Provided" },
                          { value: false, label: "Not Provided" },
                        ]}
                        placeholder="Select option"
                        styles={selectStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 py-2 px-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-700">
                Course Content
              </h4>
              <button
                type="button"
                onClick={handleAddContent}
                className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
              >
                <IoMdAdd className="mr-1" /> Add Content
              </button>
            </div>

            {contents.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 font-medium text-xs text-gray-500 uppercase">
                  <div className="col-span-4 p-2">Content Type</div>
                  <div className="col-span-4 p-2">File Name</div>
                  <div className="col-span-3 p-2">Link</div>
                  <div className="col-span-1 p-2"></div>
                </div>
                {contents.map((content, index) => (
                  <ContentItem
                    key={index}
                    content={content}
                    index={index}
                    onChange={handleContentChange}
                    onRemove={handleRemoveContent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500 border border-gray-200 rounded-md">
                No content added yet
              </div>
            )}
          </div>

          {/* Assessment Section - Only shown when course type is with assessment */}
          {courseType === "contentWithAssessment" && (
            <div className="space-y-4">
              <div className="bg-gray-100 py-2 px-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-700">
                  Assessment Details
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Assessment Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Assessment Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.assessment_name
                          ? "border-red-500"
                          : "border-gray-300"
                      } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter assessment name"
                      {...register("assessment_name", {
                        required: "Assessment name is required",
                      })}
                    />
                    {errors.assessment_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.assessment_name.message}
                      </p>
                    )}
                  </div>

                  {/* Marks Per Question */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Marks Per Question <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className={`w-full rounded-md border ${
                        errors.marks_per_question
                          ? "border-red-500"
                          : "border-gray-300"
                      } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter marks per question"
                      {...register("marks_per_question", {
                        required: "Marks per question is required",
                        min: {
                          value: 1,
                          message: "Must be at least 1",
                        },
                      })}
                    />
                    {errors.marks_per_question && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.marks_per_question.message}
                      </p>
                    )}
                  </div>

                  {/* Assessment Time */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Time (minutes) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className={`w-full rounded-md border ${
                        errors.assessment_time
                          ? "border-red-500"
                          : "border-gray-300"
                      } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter time in minutes"
                      {...register("assessment_time", {
                        required: "Assessment time is required",
                        min: {
                          value: 1,
                          message: "Must be at least 1 minute",
                        },
                      })}
                    />
                    {errors.assessment_time && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.assessment_time.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Passing Percentage */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Passing Percentage <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className={`w-full rounded-md border ${
                        errors.assessment_passing_percent
                          ? "border-red-500"
                          : "border-gray-300"
                      } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter passing percentage"
                      {...register("assessment_passing_percent", {
                        required: "Passing percentage is required",
                        min: {
                          value: 1,
                          message: "Must be at least 1%",
                        },
                        max: {
                          value: 100,
                          message: "Cannot exceed 100%",
                        },
                      })}
                    />
                    {errors.assessment_passing_percent && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.assessment_passing_percent.message}
                      </p>
                    )}
                  </div>

                  {/* Max Attempts */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Max Attempts <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className={`w-full rounded-md border ${
                        errors.assessment_max_attempts
                          ? "border-red-500"
                          : "border-gray-300"
                      } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter max attempts"
                      {...register("assessment_max_attempts", {
                        required: "Max attempts is required",
                        min: {
                          value: 1,
                          message: "Must be at least 1",
                        },
                      })}
                    />
                    {errors.assessment_max_attempts && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.assessment_max_attempts.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-100 py-2 px-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700">
                    Assessment Questions
                  </h4>
                  <button
                    type="button"
                    onClick={() => setQuestionFormVisible(true)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <IoMdAdd className="mr-1" /> Add Question
                  </button>
                </div>

                {/* Placeholder for questions list */}
                <div className="border border-gray-200 rounded-md p-4 text-center text-sm text-gray-500">
                  No questions added yet
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {formType === "Add" ? "Create Course" : "Update Course"}
            </button>
          </div>
        </form>
      </div>

      {/* Question Form Modal */}
      <QuestionForm
        isVisible={questionFormVisible}
        onClose={() => setQuestionFormVisible(false)}
        questionType={questionType}
        setQuestionType={setQuestionType}
        register={register}
        errors={errors}
        control={control}
      />
    </div>
  );
};

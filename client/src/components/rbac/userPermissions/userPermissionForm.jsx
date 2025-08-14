import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CancelButton } from "../../UI/cancelButtonUi";
import { AddButton } from "../../UI/addButtonUi";
import { createCourse } from "../../../services/lms_services/service";
import { useUserPermissionContext } from "../../../contextApis/useRbacContextFile";

// Main Form Component
export const UserPermissionForm = ({ onClose }) => {
  const {
    formType,
    getAllData,
    data,
    updateId,
    handleComponentClose,
    categoryOptions,
    assessmentDetails,
    basicDetails,
    contentDetails,
    questionDetails,
    handleComponentView,
  } = useUserPermissionContext();

  const [courseType, setCourseType] = useState("commonContent");
  const [courseFormats, setCourseFormats] = useState([
    { value: "Live", label: "Live" },
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ]);
  const [certificateOptions, setCertificateOptions] = useState([
    { value: "true", label: "Provided" },
    { value: "false", label: "Not Provided" },
  ]);
  const [contents, setContents] = useState([]);
  const [assessmentQuestion, setAssessmentQuestion] = useState([]);
  const [questionFormVisible, setQuestionFormVisible] = useState(false);

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
    if (updateId && data) {
      reset({
        course_name: basicDetails?.course_name,
        course_category_id: basicDetails?.course_category_id,
        course_trainer: basicDetails?.course_trainer,
        course_format: basicDetails?.course_format,
        course_objective: basicDetails?.course_objective,
        course_expected_results: basicDetails?.course_expected_results,
        is_certified: basicDetails?.is_certified,
      });

      if (basicDetails?.course_category_id) {
        const category = categoryOptions.find(
          (opt) => opt.value === basicDetails?.course_category_id
        );

        if (category) {
          setValue("course_category_id", category);
        }
      }

      if (basicDetails?.course_format) {
        const format = courseFormats.find(
          (opt) => opt.value === basicDetails?.course_format
        );

        if (format) {
          setValue("course_format", format);
        }
      }

      if (basicDetails?.is_certified) {
        const certificate = certificateOptions.find(
          (opt) => opt.value === basicDetails?.is_certified
        );

        if (certificate) {
          setValue("is_certified", certificate);
        }
      }

      if (basicDetails?.course_type) setCourseType(basicDetails?.course_type);

      if (basicDetails?.course_type === "contentWithAssessment") {
        setValue("assessment_name", assessmentDetails?.assessment_name);
        setValue("assessment_time", assessmentDetails?.assessment_time);
        setValue(
          "assessment_max_attempts",
          assessmentDetails?.assessment_max_attempts
        );
        setValue("marks_per_question", assessmentDetails?.marks_per_question);
        setValue(
          "assessment_passing_percent",
          assessmentDetails?.assessment_passing_percent
        );
      }
      if (contentDetails) setContents(contentDetails);
      if (questionDetails) setAssessmentQuestion(questionDetails);

      console.log("AssessmentQuestions....", assessmentQuestion);
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

  const handleAddAssessmentQuestion = (newQuestion) => {
    setAssessmentQuestion([...assessmentQuestion, newQuestion]);
    setQuestionFormVisible(false);
  };

  const handleAssessmentQuestionChange = (index, field, value) => {
    const updated = [...assessmentQuestion];
    updated[index][field] = value;
    setAssessmentQuestion(updated);
  };

  const handleAssessmentQuestionRemove = (index) => {
    const updated = assessmentQuestion.filter((_, i) => i !== index);
    setAssessmentQuestion(updated);
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
        payload.assessmentQuestions = assessmentQuestion;
      }

      console.log("Submitting:", payload);

      // let response = "";
      //  if (formType === "Update") {
      //    response = await updateCou(updateId, payload);
      //  }

      let response = await createCourse(payload);

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
      minHeight: "35px",
      fontSize: "0.875rem",
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
      fontSize: "0.875rem",
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
      fontSize: "0.875rem",
      backgroundColor: isSelected ? "#3b82f6" : "white",
      color: isSelected ? "white" : "#111827",
      "&:hover": {
        backgroundColor: isSelected ? "#3b82f6" : "#f3f4f6",
      },
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-button-hover py-2 px-4 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-sm">
            {!updateId ? "Add New Course" : "Update Course"}
          </h3>
        </div>
        <div>
          <button
            onClick={() => {
              handleComponentView("listing");
              handleComponentClose();
            }}
            className="bg-white py-1 px-4 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto scrollbar-hide p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
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
              <h4 className="text-sm font-bold text-gray-700">Basic Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Course Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
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
                  <label className="block text-xs font-bold text-gray-700">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-md border ${
                      errors.course_name ? "border-red-500" : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
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
                  <label className="block text-xs font-bold text-gray-700">
                    Trainer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-md border ${
                      errors.course_trainer
                        ? "border-red-500"
                        : "border-gray-300"
                    } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
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
                  <label className="block text-xs font-bold text-gray-700">
                    Course Format
                  </label>
                  <Controller
                    name="course_format"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={courseFormats}
                        placeholder="Select format"
                        styles={selectStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                </div>

                {/* Certificate */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Certificate Provided?
                  </label>
                  <Controller
                    name="is_certified"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={certificateOptions}
                        placeholder="Select option"
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
                  <label className="block text-xs font-bold text-gray-700">
                    Objective <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full rounded-md border text-sm ${
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
                  <label className="block text-xs font-bold text-gray-700">
                    Expected Results <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full rounded-md border text-sm ${
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
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <CancelButton onClick={onClose} text={"Cancel"} />
            <AddButton
              text={`${!updateId ? "Create Course" : "Update Course"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

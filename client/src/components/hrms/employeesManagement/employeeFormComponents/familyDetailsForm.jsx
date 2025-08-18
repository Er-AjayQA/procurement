import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";

export const FamilyDetailsItem = ({ isVisible, onClose, onAddFamilyRow }) => {
  const [questionType, setQuestionType] = useState("MCQ");
  const [options, setOptions] = useState([
    { isCorrect: false, option: "" },
    { isCorrect: false, option: "" },
    { isCorrect: false, option: "" },
    { isCorrect: false, option: "" },
  ]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const questionData = {
      assessment_question_type: questionType,
      assessment_question_title: data.question,
      assessment_question_options:
        questionType === "MCQ"
          ? options
          : [
              { isCorrect: true, option: "true" },
              { isCorrect: false, option: "false" },
            ],
      assessment_correct_answer:
        questionType === "MCQ"
          ? options.find((opt) => opt.isCorrect)?.option || ""
          : data.correctAnswer,
    };

    onAddFamilyRow(questionData);
    reset();
    setOptions([
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
    ]);
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const handleCorrectAnswerChange = (index) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(updated);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-[#0202025b] ${
          isVisible ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">Add Family Members</h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="member_name"
            >
              Member Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="member_name"
              className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter member name..."
              {...register("member_name", {
                required: "Member name is required",
              })}
            />
            {errors.member_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.member_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="relation_type"
            >
              Member Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="relation_type"
              className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter relation type..."
              {...register("relation_type", {
                required: "Relation type is required",
              })}
            />
            {errors.relation_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.relation_type.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dob"
            >
              D.O.B <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
              placeholder="Enter dob..."
              {...register("dob", {
                required: "DOB is required",
              })}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div className="pt-4">
            <AddButton type="submit" text={"Add Question"} />
          </div>
        </form>
      </div>
    </>
  );
};

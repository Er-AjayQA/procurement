import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";

export const QuestionItem = ({ isVisible, onClose, onAddQuestion }) => {
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

    onAddQuestion(questionData);
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
          <h3 className="text-white text-sm font-bold">Add Question</h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Type <span className="text-red-500">*</span>
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full rounded-md border text-xs border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="MCQ" className="text-xs">
                MCQ
              </option>
              <option value="true/false" className="text-xs">
                True/False
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full rounded-md border ${
                errors.question ? "border-red-500" : "border-gray-300"
              } py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter question"
              {...register("question", {
                required: "Question is required",
              })}
            />
            {errors.question && (
              <p className="text-red-500 text-xs mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          {questionType === "MCQ" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Options <span className="text-red-500">*</span>
              </label>
              {options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correct_option"
                    checked={opt.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border border-black"
                  />
                  <input
                    type="text"
                    value={opt.option}
                    onChange={(e) =>
                      handleOptionChange(index, "option", e.target.value)
                    }
                    className="flex-1 text-xs rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Option ${index + 1}`}
                    required
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
                    {...register("correctAnswer", { required: true })}
                    value="true"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border border-black"
                  />
                  <span className="ml-2 text-sm text-gray-700">True</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("correctAnswer", { required: true })}
                    value="false"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border border-black"
                  />
                  <span className="ml-2 text-sm text-gray-700">False</span>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4">
            <AddButton type="submit" text={"Add Question"} />
          </div>
        </form>
      </div>
    </>
  );
};

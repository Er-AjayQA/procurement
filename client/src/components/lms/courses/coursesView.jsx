import { useState } from "react";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";
import { FaEye } from "react-icons/fa";
import { CourseQuestionView } from "./courseQuestionView";

export const CoursesView = ({ handleComponentView }) => {
  const { assessmentDetails, basicDetails, contentDetails, questionDetails } =
    useCoursesMasterContext();

  const [questionView, setQuestionView] = useState(null);
  const [questionVisibility, setQuestionVisibility] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-button-hover py-2 px-4 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-sm font-bold">Course Details</h3>
        </div>
        <div>
          <button
            onClick={() => handleComponentView("listing")}
            className="bg-white py-1 px-4 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* COURSE BASIC DETAILS */}
        <div className="mb-10">
          <div className="bg-gray-100 py-2 px-3 rounded-md">
            <h4 className="text-sm text-gray-700 font-bold">
              Course Basic Details
            </h4>
          </div>

          <div className="flex flex-col gap-8 py-5 px-3">
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Course Type</label>
                <p className="text-sm">{basicDetails?.course_type || "N/A"}</p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Course Category</label>
                <p className="text-sm">
                  {basicDetails?.course_category_name || "N/A"}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Course Name</label>
                <p className="text-sm">{basicDetails?.course_name || "N/A"}</p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Trainer Name</label>
                <p className="text-sm">
                  {basicDetails?.course_trainer || "N/A"}
                </p>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Course Format</label>
                <p className="text-sm">
                  {basicDetails?.course_format || "N/A"}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">
                  Certificate Provided?
                </label>
                <p className="text-sm">
                  {basicDetails?.is_certified ? "Provided" : "Not Provided"}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Status</label>
                <p className="text-sm">
                  {basicDetails?.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">In-Active</span>
                  )}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Course Objective</label>
                <p className="text-sm">
                  {basicDetails?.course_objective || "N/A"}
                </p>
              </div>
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">
                  Course Expected Result
                </label>
                <p className="text-sm">
                  {basicDetails?.course_expected_results || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COURSE CONTENT DETAILS */}
        <div className="mb-10">
          <div className="bg-gray-100 py-2 px-3 rounded-md">
            <h4 className="text-sm font-bold text-gray-700">
              Course Content Details
            </h4>
          </div>

          {/* Content Table */}
          <div className="flex flex-col py-5 px-3">
            <div className="grid grid-cols-12">
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200 rounded-tl-lg">
                <label className="text-sm font-bold">Content Type</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200">
                <label className="text-sm font-bold">Content Name</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200">
                <label className="text-sm font-bold">Content Link</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200 rounded-tr-lg">
                <label className="text-sm font-bold">Action</label>
              </div>
            </div>

            {contentDetails?.map((content) => {
              return (
                <div className="grid grid-cols-12">
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <p className="text-sm">{content?.content_type || "N/A"}</p>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <p className="text-sm">{content?.content_name || "N/A"}</p>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <a
                      href={content?.content_link || "#"}
                      target="_blank"
                      className="text-sm hover:text-blue-600"
                    >
                      {content?.content_link || "N/A"}
                    </a>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <button>
                      <FaEye />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COURSE ASSESSMENT DETAILS */}
        <div>
          <div className="bg-gray-100 py-2 px-3 rounded-md">
            <h4 className="text-sm font-bold text-gray-700">
              Assessment Basic Details
            </h4>
          </div>

          {/* Assessment Basic Details */}
          <div className="flex flex-col gap-8 py-5 px-3">
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Assessment Name</label>
                <p className="text-sm">
                  {assessmentDetails?.assessment_name || "N/A"}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Passing Percentage</label>
                <p className="text-sm">
                  {assessmentDetails?.assessment_passing_percent}%
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Timing</label>
                <p className="text-sm">
                  {assessmentDetails?.assessment_time || "N/A"} min
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Max Attempts</label>
                <p className="text-sm">
                  {assessmentDetails?.assessment_max_attempts || "N/A"}
                </p>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-bold">Marks per Question</label>
                <p className="text-sm">
                  {assessmentDetails?.marks_per_question || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Assessment Table */}
          <div className="flex flex-col py-5 px-3">
            <div className="grid grid-cols-12">
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200 rounded-tl-lg">
                <label className="text-sm font-bold">Question Type</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200">
                <label className="text-sm font-bold">Question</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200">
                <label className="text-sm font-bold">Correct Answer</label>
              </div>
              <div className="col-span-3 border border-gray-700 text-center bg-gray-200 rounded-tr-lg">
                <label className="text-sm font-bold">Action</label>
              </div>
            </div>

            {questionDetails?.map((question) => {
              return (
                <div className="grid grid-cols-12">
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <p className="text-sm">
                      {question?.assessment_question_type}
                    </p>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <p className="text-sm">
                      {question?.assessment_question_title}
                    </p>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <p className="text-sm">
                      {question?.assessment_correct_answer}
                    </p>
                  </div>
                  <div className="col-span-3 text-center py-3 border border-gray-300 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        setQuestionView(question);
                        setQuestionVisibility(true);
                      }}
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUESTION COMPONENT */}
        <CourseQuestionView
          data={questionView}
          questionVisibility={questionVisibility}
          setQuestionVisibility={setQuestionVisibility}
        />
      </div>
    </div>
  );
};

import { MdOutlineClose } from "react-icons/md";

export const CourseQuestionView = ({
  data,
  questionVisibility,
  setQuestionVisibility,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 backdrop-blur-sm transition-opacity bg-[#0202025b] ${
          questionVisibility ? "block pointer-events-none" : "hidden"
        }`}
      ></div>

      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          questionVisibility ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">Question Details</h3>
          <div
            onClick={() => setQuestionVisibility(false)}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-10">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <label className="text-sm font-bold">Question Type:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {data?.assessment_question_type || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <label className="text-sm font-bold">Question:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {data?.assessment_question_title || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <label className="text-sm font-bold">Correct Answer:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {data?.assessment_correct_answer || "N/A"}
              </label>
            </div>
          </div>
        </div>
        {/* OPTIONS */}
        <div className="w-[80%] mx-auto rounded-lg shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-gray-200 rounded-t-lg">
              <label className="text-sm font-bold">Options</label>
            </div>
          </div>
          {data?.assessment_question_options
            ? data?.assessment_question_options.map((question, i) => {
                return (
                  <div className="p-5" key={question.id}>
                    <label className="text-sm font-bold">
                      <span className="me-5">{i + 1}.</span>
                      <span> {question?.option}</span>
                    </label>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

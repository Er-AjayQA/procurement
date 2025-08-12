import { MdEdit } from "react-icons/md";
import { FaEye, FaDownload } from "react-icons/fa";

export const CourseCards = ({ data }) => {
  return (
    <>
      <div className="relative grid grid-cols-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.2)] hover:shadow-xl transition-shadow duration-300 p-2 overflow-hidden rounded-lg">
        {/* Course Image */}
        <div className="border-e border-e-gray-300">
          <div className="w-[150px] h-[150px] overflow-hidden flex items-center justify-center p-2 mx-auto">
            <img src="/Images/Ruby.png" alt="course-image" />
          </div>
        </div>
        {/* Course Content */}
        <div className="flex flex-col gap-2 p-2 border-e border-e-gray-300 px-5">
          <div className="grid grid-cols-2">
            <p className="text-sm font-bold">Type:</p>
            <p className="text-sm">
              {data?.course_type === "commonContent"
                ? "Common Content Course"
                : "Course With Assessment"}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-bold">Course Name:</p>
            <p className="text-sm">{data?.course_name}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-bold">Format:</p>
            <p className="text-sm">{data?.course_format}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-bold">Certificated:</p>
            <p className="text-sm">
              {data?.is_certified ? "Provided" : "Not-Provided"}
            </p>
          </div>
        </div>
        {/* Course Content */}
        <div className="flex flex-col gap-5 px-5 border-e border-e-gray-300">
          <h3 className="text-sm font-bold">Objective</h3>
          <div>
            <p className="text-sm">{data?.course_objective}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center justify-center px-5">
          <button className="w-[30px] h-[30px] rounded-[10px] bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
            <FaEye className="fill-white" />
          </button>
          <button className="w-[30px] h-[30px] rounded-[10px] bg-green-600 hover:bg-green-700 flex items-center justify-center">
            <MdEdit className="fill-white" />
          </button>
          {data?.is_certified ? (
            <button className="bg-orange-600 hover:bg-orange-700 w-[30px] h-[30px] rounded-[10px] flex items-center justify-center">
              <FaDownload className="fill-white" />
            </button>
          ) : (
            <div className="w-[30px] h-[30px]"></div>
          )}
        </div>
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { uploadCountries } from "../../../services/master_services/service";
import { toast } from "react-toastify";

export const CountryMasterForm = ({ formVisibility, onClose, getAllData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Set default empty values
      excelFile: "",
    },
  });

  // Handle Form Close
  const handleFormClose = () => {
    onClose();
    reset();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        excelFile: formData.excelFile,
      };

      let response = "";

      response = await uploadCountries(payload);

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData();
        reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
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
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            Upload Countries List File
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
              <label htmlFor="excelFile" className="text-sm">
                Countries List File
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="excelFile"
                  className="border border-gray-300 py-2 px-3 rounded-lg text-[.8rem]"
                  {...register("excelFile", {
                    required: "File is required!",
                  })}
                />
                <FaUpload className="absolute top-3 start-5" />
              </div>

              {errors.excelFile && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.excelFile.message}
                </p>
              )}
              <span className="text-xs">
                <span className="text-xs">Format:</span>
                <span className="text-xs italic">Only .csv file is valid</span>
              </span>
            </div>

            <div>
              <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover">
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

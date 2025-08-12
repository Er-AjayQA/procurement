import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { uploadCountries } from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { LoadingButton } from "../../UI/loadingButton";
import { useCountryMasterContext } from "../../../contextApis/useMastersContextFile";

export const CountryMasterForm = ({ onClose }) => {
  const { formVisibility, getAllData } = useCountryMasterContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {
    reset,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);

  // Handle Form Close
  const handleFormClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }

    onClose();
    reset();
    setSelectedFile(null);
    setIsLoading(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle Form Submit
  const onSubmit = async () => {
    try {
      if (!selectedFile) {
        toast.error("Please select a file first");
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("excelFile", selectedFile);

      const response = await uploadCountries(formData);

      if (response.success) {
        toast.success(response.message);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input
        }
        getAllData();
        setSelectedFile(null);
        handleFormClose();
      } else {
        toast.error(response.message || "Failed to upload file!");
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(null);
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
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            encType="multipart/form-data"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="excelFile" className="text-sm">
                Countries List File
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="excelFile"
                  ref={fileInputRef}
                  accept=".csv"
                  className="bg-transparent border border-gray-300 py-2 px-3 rounded-lg text-[.8rem]"
                  onChange={(e) => handleFileChange(e)}
                />
                <FaUpload className="absolute top-3 start-5 z-[-1]" />
              </div>

              {!selectedFile && errors.excelFile && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.excelFile.message}
                </p>
              )}
              <span className="text-xs">
                <span className="text-xs">Format:</span>
                <span className="text-xs italic">Only .csv file is valid</span>
              </span>

              {selectedFile?.name && (
                <p className="text-xs text-green-600">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              {(isLoading && <LoadingButton />) || (
                <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover mt-2">
                  Upload File
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

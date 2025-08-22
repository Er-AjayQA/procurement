import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createTransferType,
  updateTransferType,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTransferTypeMasterContext } from "../../../contextApis/useMastersContextFile";

export const TransferTypeMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useTransferTypeMasterContext();

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
      transfer_type: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        transfer_type: data.transfer_type || data[0]?.transfer_type || "",
      });
    } else {
      reset({ transfer_type: "" });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      transfer_type: "",
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        transfer_type: formData.transfer_type || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateTransferType(updateId, payload);
      } else {
        response = await createTransferType(payload);
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
            {formType === "Add" ? "Add Transfer Type" : "Update Transfer Type"}
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
              <label htmlFor="transfer_type" className="text-sm">
                Transfer Type
              </label>
              <input
                type="text"
                id="transfer_type"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter transfer type..."
                {...register("transfer_type", {
                  required: "Transfer type is required!",
                })}
              />
              {errors.transfer_type && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.transfer_type.message}
                </p>
              )}
            </div>
            <div>
              <button className="bg-button-color px-5 py-2 rounded-md text-xs text-white hover:bg-button-hover">
                {formType === "Add" ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

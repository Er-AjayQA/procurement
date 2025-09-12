import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createTransferReason,
  updateTransferReason,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTransferReasoneMasterContext } from "../../../contextApis/useMastersContextFile";
import { useSelector } from "react-redux";

export const TransferReasonMasterForm = ({ onClose }) => {
  const { activeEntity } = useSelector((state) => state.auth);
  const { formVisibility, formType, getAllData, updateId, data } =
    useTransferReasoneMasterContext();

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
      reason_type: "",
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        reason_type: data.reason_type || data[0]?.reason_type || "",
      });
    } else {
      reset({ reason_type: "" });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      reason_type: "",
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        reason_type: formData.reason_type || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateTransferReason(activeEntity, updateId, payload);
      } else {
        response = await createTransferReason(activeEntity, payload);
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData(activeEntity);
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
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
            {formType === "Add"
              ? "Add Transfer Reason"
              : "Update Transfer Reason"}
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
              <label htmlFor="reason_type" className="text-sm">
                Transfer Reason
              </label>
              <input
                type="text"
                id="reason_type"
                className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                placeholder="Enter transfer reason..."
                {...register("reason_type", {
                  required: "Transfer reason is required!",
                })}
              />
              {errors.reason_type && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.reason_type.message}
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

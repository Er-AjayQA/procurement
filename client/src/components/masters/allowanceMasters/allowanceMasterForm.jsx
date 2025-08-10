import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createAllowance,
  updateAllowance,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAllowanceMasterContext } from "../../../contextApis/useMastersContextFile";

export const AllowanceMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useAllowanceMasterContext();

  console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      domestic_allowance: "",
      international_allowance: "",
      is_taxable: false,
    },
  });

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        name: data.name || data[0]?.name || "",
        domestic_allowance:
          data.domestic_allowance || data[0]?.domestic_allowance || "",
        international_allowance:
          data.international_allowance ||
          data[0]?.international_allowance ||
          "",
        is_taxable: data.is_taxable || data[0]?.is_taxable || "",
      });
    } else {
      reset({
        name: "",
        domestic_allowance: "",
        international_allowance: "",
        is_taxable: false,
      });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      name: "",
      domestic_allowance: "",
      international_allowance: "",
      is_taxable: false,
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name || "",
        domestic_allowance: formData.domestic_allowance || "",
        international_allowance: formData.international_allowance || "",
        is_taxable: formData.is_taxable || false,
      };

      let response = "";
      if (formType === "Update") {
        response = await updateAllowance(updateId, payload);
      } else {
        response = await createAllowance(payload);
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
            {formType === "Add" ? "Add Allowance" : "Update Allowance"}
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
        <div className="w-full mx-auto p-10">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter allowance name"
                    {...register("name", {
                      required: "Allowance Name is required!",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="domestic_allowance" className="text-sm">
                    Domestic Allowance Amount
                  </label>
                  <input
                    type="text"
                    id="domestic_allowance"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter amount"
                    {...register("domestic_allowance")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="international_allowance" className="text-sm">
                    International Allowance Amount
                  </label>
                  <input
                    type="text"
                    id="international_allowance"
                    className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                    placeholder="Enter amount"
                    {...register("international_allowance")}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_taxable"
                    className="text-[.8rem] border-black"
                    {...register("is_taxable")}
                  />
                  <label htmlFor="is_taxable" className="text-sm">
                    Is Taxable?
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
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

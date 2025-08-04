import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createRole,
  updateRole,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const RoleMasterForm = ({
  formVisibility,
  formType,
  onClose,
  getAllRoleMasters,
  updateId,
  roleData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && roleData) {
      reset({
        name: roleData.name || roleData[0]?.name || "",
      });
    } else {
      reset({ name: "" });
    }
  }, [formType, roleData, reset]);

  // Handle Form Close
  const handleFormClose = () => {
    onClose();
    reset();
  };

  // Handle Form Submit
  const onSubmit = async (data) => {
    try {
      let response = "";
      if (formType === "Update") {
        response = await updateRole(updateId, { name: data.name });
      } else {
        response = await createRole({ name: data.name });
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllRoleMasters();
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
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Role" : "Update Role"}
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
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="rounded-lg text-[.8rem]"
                placeholder="Enter department name"
                {...register("name", {
                  required: "Department Name is required!",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.name.message}
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

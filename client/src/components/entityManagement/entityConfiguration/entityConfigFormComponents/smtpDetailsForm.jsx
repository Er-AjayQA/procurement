import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";
import {
  createEntity,
  updateEntity,
} from "../../../../services/entityManagement_services/service";

export const EntitySmtpDetailsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      smtp_server_address: "",
      smtp_port_no: "",
      username: "",
      password: "",
    },
  });

  const {
    data,
    getAllData,
    updateId,
    tabType,
    handleTabClick,
    handleComponentView,
    countryCodeOptions,
    formSelectStyles,
    createdEntityId,
    setCreatedEntityId,
  } = useEntityConfigContext();

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data && countryCodeOptions.length > 0) {
      const setUpdateDefaultData = () => {
        setValue("smtp_server_address", data?.smtp_server_address);
        setValue("smtp_port_no", data?.smtp_port_no);
        setValue("username", data?.username);
        setValue("password", data?.password);
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, setValue]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        tab_type: tabType,
        entity_id: createdEntityId,
        smtp_server_address: formData?.smtp_server_address,
        smtp_port_no: formData?.smtp_port_no,
        username: formData?.username,
        password: formData?.password,
      };

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        response = await createEntity(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("communication_details");
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3 flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Row-1 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Server Address */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="smtp_server_address" className="text-sm">
                  Server Address
                </label>
                <input
                  type="text"
                  id="smtp_server_address"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter server address"
                  {...register("smtp_server_address", {
                    required: "Smtp server address is required!",
                  })}
                />
                {errors.smtp_server_address && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.smtp_server_address.message}
                  </p>
                )}
              </div>

              {/* Port Number */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="smtp_port_no" className="text-sm">
                  Port Number
                </label>
                <input
                  type="text"
                  id="smtp_port_no"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter port number"
                  {...register("smtp_port_no", {
                    required: "Port number is required!",
                  })}
                />
                {errors.smtp_port_no && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.smtp_port_no.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="username" className="text-sm">
                  SMTP Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "Username is required!",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* SMTP Password */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="password" className="text-sm">
                  SMTP Password
                </label>
                <input
                  type="text"
                  id="password"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-center gap-5">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                  onClick={() => {
                    handleComponentView("listing");
                    setCreatedEntityId(null);
                    handleTabClick("basic_details");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
                >
                  {updateId ? "Update & Next" : "Save & Next"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

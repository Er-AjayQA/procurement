import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";
import {
  createEntity,
  updateEntity,
} from "../../../../services/entityManagement_services/service";

export const EntityBasicDetailsForm = () => {
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
      logo: null,
      entity_name: "",
      display_name: "",
      entity_code_prefix: "",
      entity_type: "",
    },
  });

  const {
    data,
    getAllData,
    updateId,
    tabType,
    handleTabClick,
    handleComponentView,
    formSelectStyles,
    setCreatedEntityId,
  } = useEntityConfigContext();

  const [previewImage, setPreviewImage] = useState(null);
  const userImage = useRef(null);

  // Add this function to handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Set value for form submission
      setValue("userImage", file);
    }
  };

  // Handle Image Click
  const handleImageClick = () => {
    userImage.current.click();
  };

  // Set form values when in update mode
  useEffect(() => {
    if (updateId && data) {
      const setUpdateDefaultData = () => {
        setValue("entity_name", data?.entity_name);
        setValue("display_name", data?.display_name);
        setValue("entity_code_prefix", data?.entity_code_prefix);
        setValue("entity_type", data?.entity_type);
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, setValue]);

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        tab_type: tabType,
        entity_name: formData?.entity_name,
        display_name: formData?.display_name,
        entity_code_prefix: formData?.entity_code_prefix,
        entity_type: formData?.entity_type,
      };

      let response;
      if (updateId) {
        response = await updateEntity(updateId, payload);
      } else {
        response = await createEntity(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("smtp_details");
        getAllData();
        setCreatedEntityId(response?.data);
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
              {/* Entity Logo */}
              <div className="col-span-4 flex flex-col gap-3">
                {/* <label className="text-sm">Profile Image</label> */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={userImage}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {previewImage ? "Change Logo" : "Upload Logo"}
                    </button>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setValue("userImage", null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800 mt-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                {errors.userImage && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.userImage.message}
                  </p>
                )}
              </div>

              {/* Entity Name */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="entity_name" className="text-sm">
                  Entity Name
                </label>
                <input
                  type="text"
                  id="entity_name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter entity name"
                  {...register("entity_name", {
                    required: "Entity Name is required!",
                  })}
                />
                {errors.entity_name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.entity_name.message}
                  </p>
                )}
              </div>

              {/* Entity Display Name */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="display_name" className="text-sm">
                  Display Name
                </label>
                <input
                  type="text"
                  id="display_name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter entity display name"
                  {...register("display_name", {
                    required: "Display Name is required!",
                  })}
                />
                {errors.display_name && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.display_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row-2 */}
            <div className="grid grid-cols-12 gap-5">
              {/* Entity Prefix Code */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="entity_code_prefix" className="text-sm">
                  Entity Prefix Code
                </label>
                <input
                  type="text"
                  id="entity_code_prefix"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter prefix code"
                  {...register("entity_code_prefix", {
                    required: "Prefix code is required!",
                  })}
                />
                {errors.entity_code_prefix && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.entity_code_prefix.message}
                  </p>
                )}
              </div>

              {/* Entity Type */}
              <div className="col-span-4 flex flex-col gap-3">
                <label htmlFor="entity_type" className="text-sm">
                  Entity type
                </label>
                <input
                  type="text"
                  id="entity_type"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter entity type"
                  {...register("entity_type", {
                    required: "Entity type is required!",
                  })}
                />
                {errors.entity_type && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.entity_type.message}
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

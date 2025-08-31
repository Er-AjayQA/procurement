import { MdOutlineClose } from "react-icons/md";
import { useAllTicketsContext } from "../../../contextApis/useTicketContextFile";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { allocateTicket } from "../../../services/ticket_services/service";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";
import { useEffect } from "react";

export const TicketActionPopup = ({ showActionPopup, setShowActionPopup }) => {
  const { data, setViewId, refreshData, formSelectStyles } =
    useAllTicketsContext();

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
      allocated_to_user_id: "",
    },
  });

  const { userDetails } = useSelector((state) => state.auth);
  const [userOptions, setUserOptions] = useState(null);

  // Handle Click Cancel Button
  const handleCancel = () => {
    resetForm();
    setViewId(null);
    setShowActionPopup(false);
  };

  const resetForm = () => {
    reset({
      allocated_to_user_id: "",
    });
  };

  // Get All Users List
  const getAllUsersOptions = async () => {
    try {
      const response = await getAllEmployeeDetails({
        limit: "",
        page: "",
        filter: {
          role_id: "",
          user_id: "",
        },
      });

      if (response.success) {
        const userData = response?.data;
        // Filter and map properly
        const filteredOptions = userData
          .filter((item) => item?.dep_id === data?.created_for_dept_id)
          .map((item) => ({
            value: item?.id,
            label: `${item?.title} ${item?.name} - ${item?.emp_code}`,
          }));

        setUserOptions(filteredOptions);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUserOptions(null);
    }
  };

  // Handle Form Submission
  const onSubmit = async (formData, e) => {
    try {
      e.preventDefault();
      let response;

      const payload = {
        allocated_to_user_id: formData?.allocated_to_user_id,
      };

      response = await allocateTicket(data?.id, payload);

      if (response.success) {
        toast.success(response.message);
        if (typeof refreshData === "function") {
          refreshData();
        }
        handleCancel();
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
    return options.find((opt) => opt?.value === value);
  };

  useEffect(() => {
    getAllUsersOptions();
  }, [data]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 backdrop-blur-sm transition-all duration-[.4s] ${
          showActionPopup ? "block" : "hidden"
        }`}
      ></div>

      {/* List Form */}
      <div
        className={`absolute top-[50%] start-[50%] w-[30%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 min-h-[40%] shadow-lg rounded-lg transition-all duration-[.4s]`}
      >
        <div className="bg-button-hover py-2 px-2 rounded-t-md flex items-center justify-between">
          <h3 className="text-white text-xs font-bold">Allocate Ticket</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white cursor-pointer"
            onClick={handleCancel}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <div className="basis-[90%] justify-around rounded-md pb-4 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Employee Name */}
                <div className="col-span-12 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="allocated_to_user_id"
                      className="text-sm font-medium"
                    >
                      Select Employee
                    </label>
                    <Controller
                      name="allocated_to_user_id"
                      control={control}
                      rules={{
                        required: "Employee is required!",
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={userOptions || []}
                          value={findSelectedOption(userOptions, field.value)}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select employee..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={formSelectStyles}
                        />
                      )}
                    />
                    {errors.allocated_to_user_id && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.allocated_to_user_id.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 px-10">
              <button
                type="submit"
                className="bg-button-color hover:bg-button-hover text-white text-sm py-2 px-4 rounded-lg"
              >
                Allocate Ticket
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

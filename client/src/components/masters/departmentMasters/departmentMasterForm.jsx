import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import {
  createDepartment,
  updateDepartment,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";

export const DepartmentMasterForm = ({
  formVisibility,
  formType,
  onClose,
  getAllData,
  updateId,
  data,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Set default empty values
      name: "",
      department_head_id: "",
      dept_head_name: "",
    },
  });
  const [allUser, setAllUsers] = useState(null);

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      reset({
        name: data.name || data[0]?.name || "",
        department_head_id: data[0].department_head_id || "",
        dept_head_name: data[0].dept_head_name || "",
      });
    } else {
      reset({ name: "", department_head_id: "", dept_head_name: "" });
    }
  }, [formType, data, reset, setValue]);

  // Handle Form Close
  const handleFormClose = () => {
    onClose();
    reset();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        department_head_id: formData.department_head_id || null, // This handles empty string
        dept_head_name: formData.department_head_id
          ? allUser.find((u) => u.id == formData.department_head_id)?.name
          : null,
      };

      let response = "";
      if (formType === "Update") {
        response = await updateDepartment(updateId, payload);
      } else {
        response = await createDepartment(payload);
      }

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

  // Get All Users
  const getAllUsers = async () => {
    const response = await getAllEmployeeDetails();

    if (response.success) {
      setAllUsers(response.data);
    }
  };

  // Handle Department Head Change
  const handleDepartmentHeadChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = allUser?.find((user) => user.id == selectedUserId);
    setValue("department_head_id", selectedUserId);
    setValue("dept_head_name", selectedUser?.name || "");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
            {formType === "Add" ? "Add Department" : "Update Department"}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="department_head_id" className="text-sm">
                Dept. Head
              </label>
              <select
                id="department_head_id"
                className="rounded-lg text-[.8rem]"
                placeholder="Select department head"
                {...register("department_head_id", {
                  setValueAs: (v) => (v === "" ? null : parseInt(v)),
                })}
                onChange={handleDepartmentHeadChange}
              >
                <option value="">--Select--</option>
                {allUser
                  ? allUser.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
              {/* Hidden field to store the department head name */}
              <input type="hidden" {...register("dept_head_name")} />
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

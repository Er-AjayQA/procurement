import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import {
  createDepartment,
  getAllPhoneCodes,
  updateDepartment,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";

export const BranchMasterForm = ({
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

  const [selectedCodeDropdown, setSelectedCodeDropdown] = useState(null);
  const [codeOptions, setCodeOptions] = useState(null);
  const [selectedAltCodeDropdown, setSelectedAltCodeDropdown] = useState(null);
  const [altCodeOptions, setAltCodeOptions] = useState(null);

  // Get All Country Code
  const getAllCodes = async () => {
    try {
      const response = await getAllPhoneCodes();

      if (response.success) {
        setCodeOptions((prev) => {
          return response.data.map((code) => ({
            value: code.code,
            label: code.code,
          }));
        });

        setAltCodeOptions((prev) => {
          return response.data.map((code) => ({
            value: code.code,
            label: code.code,
          }));
        });
      } else {
        setCodeOptions(null);
        setAltCodeOptions(null);
      }
    } catch (error) {
      setCodeOptions(null);
      setAltCodeOptions(null);
    }
  };

  // Handle Selected Code
  const handleSelectCode = (selectedOption) => {
    setSelectedCodeDropdown(selectedOption);
  };

  // Handle Selected Code
  const handleSelectAltCode = (selectedOption) => {
    setSelectedAltCodeDropdown(selectedOption);
  };

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

  useEffect(() => {
    getAllCodes();
  }, []);

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[70%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "translate-y-[0%]" : "translate-y-[-200%]"
        }`}
      >
        <div className="bg-button-hover py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">
            {formType === "Add" ? "Add Branch" : "Update Branch"}
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
        <div className="w-auto p-10">
          <form
            className="grid grid-cols-3 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Branch Name */}
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

            {/* Contact Person Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="branch_contact_person" className="text-sm">
                Contact Person Name
              </label>
              <input
                type="text"
                id="branch_contact_person"
                className="rounded-lg text-[.8rem]"
                placeholder="Enter contact person name"
                {...register("branch_contact_person", {
                  required: "Contact person Name is required!",
                })}
              />
              {errors.branch_contact_person && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.branch_contact_person.message}
                </p>
              )}
            </div>

            {/* Branch Contact Number */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="branch_contact_number" className="text-sm">
                  Contact No.
                </label>
                <div className="flex">
                  <Select
                    value={selectedCodeDropdown}
                    onChange={handleSelectCode}
                    options={codeOptions}
                    placeholder="code"
                    isClearable
                    isSearchable
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "32px",
                        flexBasis: "40%",
                        // height: "32px",
                        borderRadius: "0.5rem",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                        borderColor: "rgb(78, 79, 80)", // gray-300
                        fontSize: "0.8rem", // text-sm
                        paddingLeft: "0.75rem", // px-2
                        paddingRight: "0.75rem", // px-2
                        paddingTop: "0.5rem", // px-2
                        paddingBottom: "0.5rem", // px-2
                        "&:hover": {
                          borderColor: "#d1d5db", // gray-300
                        },
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
                        fontSize: "0.875rem", // text-sm
                      }),
                    }}
                  />
                  <input
                    type="text"
                    id="branch_contact_number"
                    className="flex-grow rounded-e-lg border-s-0 text-[.8rem]"
                    placeholder="Enter contact number"
                    {...register("branch_contact_number", {
                      required: "Contact number is required!",
                    })}
                  />
                </div>
                {errors.branch_contact_number && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.branch_contact_number.message}
                  </p>
                )}
              </div>
            </div>

            {/* Branch Alternative Contact Number */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="branch_alt_contact_number" className="text-sm">
                  Alt. Contact No.
                </label>
                <div className="flex">
                  <Select
                    value={selectedAltCodeDropdown}
                    onChange={handleSelectAltCode}
                    options={altCodeOptions}
                    placeholder="code"
                    isClearable
                    isSearchable
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "32px",
                        flexBasis: "40%",
                        // height: "32px",
                        borderRadius: "0.5rem",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                        borderColor: "rgb(78, 79, 80)", // gray-300
                        fontSize: "0.8rem", // text-sm
                        paddingLeft: "0.75rem", // px-2
                        paddingRight: "0.75rem", // px-2
                        paddingTop: "0.5rem", // px-2
                        paddingBottom: "0.5rem", // px-2
                        "&:hover": {
                          borderColor: "#d1d5db", // gray-300
                        },
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
                        fontSize: "0.875rem", // text-sm
                      }),
                    }}
                  />
                  <input
                    type="text"
                    id="branch_alt_contact_number"
                    className="flex-grow rounded-e-lg border-s-0 text-[.8rem]"
                    placeholder="Enter alt contact number"
                    {...register("branch_alt_contact_number")}
                  />
                </div>
              </div>
            </div>

            {/* Branch EmailId */}
            <div className="flex flex-col gap-2">
              <label htmlFor="branch_emailId" className="text-sm">
                Email ID
              </label>
              <input
                type="text"
                id="branch_emailId"
                className="rounded-lg text-[.8rem]"
                placeholder="Enter branch emailId"
                {...register("branch_emailId", {
                  required: "EmailId is required!",
                })}
              />
              {errors.branch_emailId && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.branch_emailId.message}
                </p>
              )}
            </div>

            {/* Alt Branch EmailId */}
            <div className="flex flex-col gap-2">
              <label htmlFor="branch_alt_emailId" className="text-sm">
                Alt. Email ID
              </label>
              <input
                type="text"
                id="branch_alt_emailId"
                className="rounded-lg text-[.8rem]"
                placeholder="Enter branch alt. emailId"
                {...register("branch_alt_emailId")}
              />
            </div>

            {/* Branch Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="branch_emailId" className="text-sm">
                Branch Address
              </label>
              <textarea
                id="branch_address"
                className="rounded-lg text-[.8rem]"
                placeholder="Enter branch address"
                {...register("branch_address", {
                  required: "Branch address is required!",
                })}
              />
              {errors.branch_address && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.branch_address.message}
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

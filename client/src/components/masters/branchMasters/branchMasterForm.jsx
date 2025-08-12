import { useForm, Controller } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import {
  createBranch,
  getAllCities,
  getAllCountries,
  getAllPhoneCodes,
  getAllStates,
  updateBranch,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useBranchMasterContext } from "../../../contextApis/useMastersContextFile";

export const BranchMasterForm = ({ onClose }) => {
  const { formVisibility, formType, getAllData, updateId, data } =
    useBranchMasterContext();
  const [codeOptions, setCodeOptions] = useState(null);
  const [altCodeOptions, setAltCodeOptions] = useState(null);
  const [countryOptions, setCountryOptions] = useState(null);
  const [stateOptions, setStateOptions] = useState(null);
  const [cityOptions, setCityOptions] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // Get All Country Code
  const getAllCodes = async () => {
    try {
      const response = await getAllPhoneCodes();

      if (response.success) {
        setCodeOptions(
          response.data.map((code) => ({
            value: `${code.code}`,
            label: `${code.code}`,
            codeOnly: `${code.code}`,
          }))
        );

        setAltCodeOptions(
          response.data.map((code) => ({
            value: `${code.code}`,
            label: `${code.code}`,
            codeOnly: `${code.code}`,
          }))
        );
      } else {
        setCodeOptions(null);
        setAltCodeOptions(null);
      }
    } catch (error) {
      setCodeOptions(null);
      setAltCodeOptions(null);
    }
  };

  // Get All Country List
  const getAllCountriesList = async () => {
    try {
      const response = await getAllCountries({
        limit: 500,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setCountryOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      } else {
        setCountryOptions(null);
      }
    } catch (error) {
      setCountryOptions(null);
    }
  };

  // Get All States List
  const getAllStatesList = async (id) => {
    try {
      if (!id) {
        return;
      }
      const response = await getAllStates({
        limit: 500,
        page: 1,
        filter: {
          country_id: id,
          name: "",
        },
      });

      if (response.success) {
        const states = response.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        setStateOptions(states);
        return states;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Get All Cities List
  const getAllCitiesList = async (country, state) => {
    try {
      if (!country || !state) {
        return;
      }
      const response = await getAllCities({
        limit: 500,
        page: 1,
        filter: {
          country_id: country,
          state_id: state,
          name: "",
        },
      });

      if (response.success) {
        const cities = response.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        setCityOptions(cities);
        return cities;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Set form values when in update mode
  useEffect(() => {
    if (formType === "Update" && data) {
      const branchData = Array.isArray(data) ? data[0] : data;
      reset({
        name: branchData.name || "",
        branch_contact_person: branchData.branch_contact_person || "",
        branch_contact_number: branchData.branch_contact_number || "",
        branch_alt_contact_number: branchData.branch_alt_contact_number || "",
        branch_emailId: branchData.branch_emailId || "",
        branch_alt_emailId: branchData.branch_alt_emailId || "",
        branch_address: branchData.branch_address || "",
        billing_status: branchData.billing_status || false,
      });

      const setDropdownOptions = async () => {
        try {
          // Load phone codes if not already loaded
          if (!codeOptions || !altCodeOptions) {
            await getAllCodes();
          }

          // Set phone codes
          if (branchData.country_code) {
            const countryCodeOption = codeOptions?.find(
              (code) => code.value === branchData.country_code
            );
            if (countryCodeOption) setValue("country_code", countryCodeOption);
          }

          if (branchData.alt_country_code) {
            const altCountryCodeOption = altCodeOptions?.find(
              (code) => code.value === branchData.alt_country_code
            );
            if (altCountryCodeOption)
              setValue("alt_country_code", altCountryCodeOption);
          }

          // Load countries if not already loaded
          if (!countryOptions) {
            await getAllCountriesList();
          }

          // Set country if available
          if (branchData.country_id) {
            const countryOption = countryOptions?.find(
              (c) => c.value === branchData.country_id
            );

            if (countryOption) {
              setValue("country_id", countryOption);

              // Load states for this country
              const states = await getAllStatesList(branchData.country_id);

              // Set state if available
              if (branchData.state_id && states) {
                const stateOption = states.find(
                  (s) => s.value === branchData.state_id
                );

                if (stateOption) {
                  setValue("state_id", stateOption);

                  // Load cities for this state
                  const cities = await getAllCitiesList(
                    branchData.country_id,
                    branchData.state_id
                  );

                  // Set city if available
                  if (branchData.city_id && cities) {
                    const cityOption = cities.find(
                      (c) => c.value === branchData.city_id
                    );
                    if (cityOption) setValue("city_id", cityOption);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error setting dropdown options:", error);
        }
      };

      setDropdownOptions();
    } else {
      // Reset form for add mode
      reset({
        name: "",
        branch_contact_person: "",
        branch_contact_number: "",
        branch_alt_contact_number: "",
        branch_emailId: "",
        branch_alt_emailId: "",
        branch_address: "",
        billing_status: false,
        country_code: null,
        alt_country_code: null,
        country_id: null,
        state_id: null,
        city_id: null,
      });
    }
  }, [
    formType,
    data,
    reset,
    setValue,
    codeOptions,
    altCodeOptions,
    countryOptions,
  ]);

  // Handle Form Close
  const handleFormClose = () => {
    reset({
      name: "",
      branch_contact_person: "",
      branch_contact_number: "",
      branch_alt_contact_number: "",
      branch_emailId: "",
      branch_alt_emailId: "",
      branch_address: "",
      billing_status: false,
      country_code: null,
      alt_country_code: null,
      country_id: null,
      state_id: null,
      city_id: null,
    });
    onClose();
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        branch_contact_person: formData.branch_contact_person,
        country_code: formData.country_code?.value || "",
        branch_contact_number: formData.branch_contact_number,
        alt_country_code: formData.alt_country_code?.value || "",
        branch_alt_contact_number: formData.branch_alt_contact_number || "",
        branch_emailId: formData.branch_emailId,
        branch_alt_emailId: formData.branch_alt_emailId || "",
        branch_address: formData.branch_address,
        billing_status: formData.billing_status || false,
        country_id: formData.country_id?.value || "",
        state_id: formData.state_id?.value || "",
        city_id: formData.city_id?.value || "",
      };

      let response = "";
      if (formType === "Update") {
        response = await updateBranch(updateId, payload);
      } else {
        response = await createBranch(payload);
      }

      if (response.success) {
        toast.success(response.message);
        handleFormClose();
        getAllData();
      } else if (response.success === false) {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      throw new Error(error.message);
    }
  };

  const countryId = watch("country_id");
  const stateId = watch("state_id");

  // Get All Codes on Page Load
  useEffect(() => {
    getAllCodes();
    getAllCountriesList();
  }, [setValue]);

  useEffect(() => {
    if (countryId) {
      getAllStatesList(countryId?.value);
    }
  }, [countryId, setValue]);

  useEffect(() => {
    if (countryId && stateId) {
      getAllCitiesList(countryId?.value, stateId?.value);
    }
  }, [stateId, setValue]);

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
        <div className="w-full mx-auto p-10">
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-8">
              {/* Branch Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
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
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
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
                    <Controller
                      name="country_code"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={codeOptions}
                          placeholder="code"
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...selectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                    <input
                      type="text"
                      id="branch_contact_number"
                      className="flex-grow rounded-e-lg border-s-0 text-[.8rem] hover:border-borders-inputHover"
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
                  <label
                    htmlFor="branch_alt_contact_number"
                    className="text-sm"
                  >
                    Alt. Contact No.
                  </label>
                  <div className="flex">
                    <Controller
                      name="alt_country_code"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={altCodeOptions}
                          placeholder="code"
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...selectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                    <input
                      type="text"
                      id="branch_alt_contact_number"
                      className="flex-grow rounded-e-lg border-s-0 text-[.8rem] hover:border-borders-inputHover"
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
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
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
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                  placeholder="Enter branch alt. emailId"
                  {...register("branch_alt_emailId")}
                />
              </div>

              {/* Country Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="country_id" className="text-sm">
                  Country
                </label>
                <Controller
                  name="country_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryOptions}
                      placeholder="Select country"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.country_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.country_id.message}
                  </p>
                )}
              </div>

              {/* State Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="state_id" className="text-sm">
                  State
                </label>
                <Controller
                  name="state_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={stateOptions}
                      placeholder="Select state"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      isDisabled={!countryId}
                    />
                  )}
                />
                {errors.state_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.state_id.message}
                  </p>
                )}
              </div>

              {/* City Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="city_id" className="text-sm">
                  City
                </label>
                <Controller
                  name="city_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cityOptions}
                      placeholder="Select city"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                      isDisabled={!stateId}
                    />
                  )}
                />
                {errors.city_id && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.city_id.message}
                  </p>
                )}
              </div>

              {/* Branch Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="branch_address" className="text-sm">
                  Branch Address
                </label>
                <textarea
                  id="branch_address"
                  className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
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

              {/* Is Billing Address */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="billing_status"
                  id="billing_status"
                  className="border-black text-[.8rem]"
                  {...register("billing_status")}
                />
                <label htmlFor="billing_status" className="text-sm">
                  Is Billing Branch?
                </label>
              </div>
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

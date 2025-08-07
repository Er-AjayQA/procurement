import { useForm } from "react-hook-form";
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

export const BranchMasterForm = ({
  formVisibility,
  formType,
  onClose,
  getAllData,
  updateId,
  data,
}) => {
  const [selectedCodeDropdown, setSelectedCodeDropdown] = useState(null);
  const [codeOptions, setCodeOptions] = useState(null);
  const [selectedAltCodeDropdown, setSelectedAltCodeDropdown] = useState(null);
  const [altCodeOptions, setAltCodeOptions] = useState(null);

  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(null);
  const [countryOptions, setCountryOptions] = useState(null);
  const [selectedStateDropdown, setSelectedStateDropdown] = useState(null);
  const [stateOptions, setStateOptions] = useState(null);
  const [selectedCityDropdown, setSelectedCityDropdown] = useState(null);
  const [cityOptions, setCityOptions] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Set default empty values
      name: "",
      branch_contact_person: "",
      country_code: "",
      branch_contact_number: "",
      alt_country_code: "91",
      branch_alt_contact_number: "",
      branch_emailId: "",
      branch_alt_emailId: "",
      branch_address: "",
      billing_status: "",
      country_id: "",
      state_id: "",
      city_id: "",
    },
  });

  // Get All Country Code
  const getAllCodes = async () => {
    try {
      const response = await getAllPhoneCodes();

      if (response.success) {
        setCodeOptions(
          response.data.map((code) => ({
            value: code.code,
            label: code.display,
            codeOnly: code.code,
          }))
        );

        setAltCodeOptions(
          response.data.map((code) => ({
            value: code.code,
            label: code.display,
            codeOnly: code.code,
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
      });

      if (response.success) {
        setCountryOptions((prev) => {
          return response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }));
        });
      } else {
        setSelectedCountryDropdown(null);
        setCountryOptions(null);
      }
    } catch (error) {
      setSelectedCountryDropdown(null);
      setCountryOptions(null);
    }
  };

  // Get All States List
  const getAllStatesList = async (selectedCountryDropdown) => {
    try {
      if (!selectedCountryDropdown) {
        return;
      }
      const response = await getAllStates({
        limit: 500,
        page: 1,
        filter: {
          country_id: selectedCountryDropdown.value,
        },
      });

      if (response.success) {
        setStateOptions((prev) => {
          return response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }));
        });
      } else {
        setSelectedStateDropdown(null);
        setStateOptions(null);
      }
    } catch (error) {
      setSelectedStateDropdown(null);
      setStateOptions(null);
    }
  };

  // Get All Cities List
  const getAllCitiesList = async (
    selectedCountryDropdown,
    selectedStateDropdown
  ) => {
    try {
      if (!selectedCountryDropdown || !selectedStateDropdown) {
        return;
      }
      const response = await getAllCities({
        limit: 500,
        page: 1,
        filter: {
          country_id: selectedCountryDropdown.value,
          state_id: selectedStateDropdown.value,
          name: "",
        },
      });

      if (response.success) {
        setCityOptions((prev) => {
          return response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }));
        });
      } else {
        setSelectedCityDropdown(null);
        setCityOptions(null);
      }
    } catch (error) {
      setSelectedCityDropdown(null);
      setCityOptions(null);
    }
  };

  // Handle Selected Code
  const handleSelectCode = (selectedOption) => {
    setSelectedCodeDropdown(
      selectedOption
        ? {
            value: selectedOption.value,
            label: selectedOption.codeOnly,
          }
        : null
    );
  };

  // Handle Selected Code
  const handleSelectAltCode = (selectedOption) => {
    setSelectedAltCodeDropdown(
      selectedOption
        ? {
            value: selectedOption.value,
            label: selectedOption.codeOnly,
          }
        : null
    );
  };

  // Handle Selected Country
  const handleSelectCountry = (selectedOption) => {
    setSelectedCountryDropdown(selectedOption);
  };

  // Handle Selected State
  const handleSelectState = (selectedOption) => {
    setSelectedStateDropdown(selectedOption);
  };

  // Handle Selected City
  const handleSelectCity = (selectedOption) => {
    setSelectedCityDropdown(selectedOption);
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

      // Set Selected Country Code
      if (branchData.country_code && codeOptions) {
        const codeOption = codeOptions?.find(
          (opt) => opt.value === branchData.country_code
        );
        if (codeOption)
          setSelectedCodeDropdown({
            value: codeOption.value,
            label: codeOption.codeOnly,
          });
      }

      // Set Selected Alt. Country Code
      if (branchData.alt_country_code && altCodeOptions) {
        const altCodeOption = altCodeOptions?.find(
          (opt) => opt.value === branchData.alt_country_code
        );
        if (altCodeOption)
          setSelectedAltCodeDropdown({
            value: altCodeOption.value,
            label: altCodeOption.codeOnly,
          });
      }

      // Set Selected Country
      if (branchData.country_id && countryOptions) {
        const countryOption = countryOptions?.find(
          (opt) => opt.value === branchData.country_id
        );
        if (countryOption)
          setSelectedCountryDropdown({
            value: countryOption.value,
            label: countryOption.label,
          });
      }

      // Set Selected State
      if (branchData.state_id && stateOptions) {
        const stateOption = stateOptions?.find(
          (opt) => opt.value === branchData.state_id
        );
        if (stateOption)
          setSelectedStateDropdown({
            value: stateOption.value,
            label: stateOption.label,
          });
      }

      // Set Selected City
      if (branchData.city_id && cityOptions) {
        const cityOption = cityOptions?.find(
          (opt) => opt.value === branchData.city_id
        );
        if (cityOption)
          setSelectedCityDropdown({
            value: cityOption.value,
            label: cityOption.label,
          });
      }
    } else {
      reset({
        name: "",
        branch_contact_person: "",
        branch_contact_number: "",
        branch_alt_contact_number: "",
        branch_emailId: "",
        branch_alt_emailId: "",
        branch_address: "",
        billing_status: false,
      });
      setSelectedCodeDropdown(null);
      setSelectedAltCodeDropdown(null);
      setSelectedCountryDropdown(null);
      setSelectedStateDropdown(null);
      setSelectedCityDropdown(null);
    }
  }, [
    formType,
    data,
    reset,
    codeOptions,
    altCodeOptions,
    countryOptions,
    stateOptions,
    cityOptions,
  ]);

  // Handle Form Close
  const handleFormClose = () => {
    onClose();
    reset();
    setSelectedCodeDropdown(null);
    setSelectedAltCodeDropdown(null);
    setSelectedCountryDropdown(null);
    setSelectedStateDropdown(null);
    setSelectedCityDropdown(null);
  };

  // Handle Form Submit
  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        branch_contact_person: formData.branch_contact_person,
        country_code: selectedCodeDropdown?.value || "",
        branch_contact_number: formData.branch_contact_number,
        alt_country_code: selectedAltCodeDropdown?.value || "",
        branch_alt_contact_number: formData.branch_alt_contact_number || "",
        branch_emailId: formData.branch_emailId,
        branch_alt_emailId: formData.branch_alt_emailId || "",
        branch_address: formData.branch_address,
        billing_status: formData.billing_status || false,
        country_id: selectedCountryDropdown?.value || "",
        state_id: selectedStateDropdown?.value || "",
        city_id: selectedCityDropdown?.value || "",
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
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Get All Codes on Page Load
  useEffect(() => {
    getAllCodes();
  }, []);

  // Get All Countries on Page Load
  useEffect(() => {
    getAllCountriesList();
  }, [updateId]);

  // Get All States on Page Load
  useEffect(() => {
    if (selectedCountryDropdown) {
      getAllStatesList(selectedCountryDropdown);
    }
  }, [updateId, selectedCountryDropdown]);

  // Get All Cities on Page Load
  useEffect(() => {
    if (selectedCountryDropdown && selectedStateDropdown) {
      getAllCitiesList(selectedCountryDropdown, selectedStateDropdown);
    }
  }, [updateId, selectedStateDropdown]);

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
                          width: "120px",
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
                        singleValue: (base) => ({
                          ...base,
                          fontSize: "0.8rem", // Explicitly set font size for selected value
                        }),
                        menu: (base) => ({
                          ...base,
                          fontSize: "0.875rem", // Slightly larger in dropdown
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
                          fontSize: "0.8rem", // text-sm
                        }),
                      }}
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
                          width: "120px",
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
                        singleValue: (base) => ({
                          ...base,
                          fontSize: "0.8rem", // Explicitly set font size for selected value
                        }),
                        menu: (base) => ({
                          ...base,
                          fontSize: "0.875rem", // Slightly larger in dropdown
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
                          fontSize: "0.8rem", // text-sm
                        }),
                      }}
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
                <Select
                  value={selectedCountryDropdown}
                  onChange={handleSelectCountry}
                  options={countryOptions}
                  placeholder="Select country"
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
                <Select
                  value={selectedStateDropdown}
                  onChange={handleSelectState}
                  options={stateOptions}
                  placeholder="Select state"
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
                <Select
                  value={selectedCityDropdown}
                  onChange={handleSelectCity}
                  options={cityOptions}
                  placeholder="Select city"
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
                  id="billing_status"
                  className="border-black text-[.8rem]"
                  placeholder="Enter branch address"
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

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../contextApis/useHrmsContextFile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllCities,
  getAllNationalities,
  getAllStates,
} from "../../../../services/master_services/service";
import { IoMdAdd } from "react-icons/io";
import { FamilyDetailsItem } from "./familyDetailsForm";

export const EmployeePersonalDetailsForm = () => {
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
      title: "",
      name: "",
      code: "",
      contact_no: "",
      alt_code: "",
      alt_contact_no: "",
      dob: "",
      gender: "",
      personal_email: "",
      official_email: "",
      reporting_manager_id: "",
      role_id: "",
      emp_type_id: "",
      designation_id: "",
      dep_id: "",
      area_id: "",
      userImage: null,
    },
  });

  // Watch Input Fields
  const selectedPresentCountry = watch("present_country_id");
  const selectedPresentState = watch("present_state_id");
  const selectedPermanentCountry = watch("permanent_country_id");
  const selectedPermanentState = watch("permanent_state_id");
  const selectedPersonalState = watch("personal_state_id");

  const {
    data,
    countryListOptions,
    formSelectStyles,
    bloodOptions,
    maritalStatusOptions,
  } = useEmployeeContext();
  const [presentStateOptions, setPresentStateOptions] = useState([]);
  const [presentCityOptions, setPresentCityOptions] = useState([]);
  const [permanentStateOptions, setPermanentStateOptions] = useState([]);
  const [permanentCityOptions, setPermanentCityOptions] = useState([]);
  const [personalStateOptions, setPersonalStateOptions] = useState([]);
  const [personalCityOptions, setPersonalCityOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);
  const [familyFormVisible, setFamilyFormVisible] = useState(false);
  const [familyDetails, setFamilyDetails] = useState([]);

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  // Get All Present State Options
  const getAllPresentStatesOptions = async (presentCountryId) => {
    try {
      if (!presentCountryId) {
        setPresentStateOptions([]);
        return;
      }
      const response = await getAllStates({
        limit: 500000,
        page: "",
        filter: {
          country_id: presentCountryId,
          name: "",
        },
      });

      if (response.success) {
        setPresentStateOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPresentStateOptions([]);
      toast.error(error.message || "Failed to load states");
    }
  };

  // Get All Present Cities Options
  const getAllPresentCitiesOptions = async (
    presentCountryId,
    presentStateId
  ) => {
    try {
      if (!presentCountryId || !presentStateId) {
        setPresentCityOptions([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: presentStateId,
          country_id: presentCountryId,
          name: "",
        },
      });

      if (response.success) {
        setPresentCityOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPresentCityOptions([]);
      toast.error(error.message || "Failed to load Cities");
    }
  };

  // Get All Permanent State Options
  const getAllPermanentStatesOptions = async (permanentCountryId) => {
    try {
      if (!permanentCountryId) {
        setPermanentStateOptions([]);
        return;
      }
      const response = await getAllStates({
        limit: 500000,
        page: "",
        filter: {
          country_id: permanentCountryId,
          name: "",
        },
      });

      if (response.success) {
        setPermanentStateOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPermanentStateOptions([]);
      toast.error(error.message || "Failed to load states");
    }
  };

  // Get All Permanent Cities Options
  const getAllPermanentCitiesOptions = async (
    permanentCountryId,
    permanentStateId
  ) => {
    try {
      if (!permanentCountryId || !permanentStateId) {
        setPermanentCityOptions([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: permanentStateId,
          country_id: permanentCountryId,
          name: "",
        },
      });

      if (response.success) {
        setPermanentCityOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPermanentCityOptions([]);
      toast.error(error.message || "Failed to load Cities");
    }
  };

  // Get All Nationality Options
  const getAllNationalityOptions = async () => {
    try {
      const response = await getAllNationalities();

      if (response.success) {
        setNationalityOptions(
          response.data.map((data) => ({
            value: data?.nationality,
            label: data?.nationality,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setNationalityOptions([]);
      toast.error(error.message || "Failed to load Nationalities");
    }
  };

  // Get All Personal State Options
  const getAllPersonalStatesOptions = async () => {
    try {
      const response = await getAllStates({
        limit: 5000000,
        page: "",
        filter: {
          country_id: "",
          name: "",
        },
      });

      if (response.success) {
        setPersonalStateOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPersonalStateOptions([]);
      toast.error(error.message || "Failed to load states");
    }
  };

  // Get All Personal City Options
  const getAllPersonalCityOptions = async (permanentStateId) => {
    try {
      if (!permanentStateId) {
        setPermanentCityOptions([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: permanentStateId,
          country_id: "",
          name: "",
        },
      });

      if (response.success) {
        setPersonalCityOptions(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPersonalCityOptions([]);
      toast.error(error.message || "Failed to load Cities");
    }
  };

  // Handle Add Family Member
  const handleAddFamilyDetails = () => {};

  // Handle Family Member Remove
  const handleFamilyDetailsRemove = () => {};

  // Get Present State on Present Country Change
  useEffect(() => {
    if (selectedPresentCountry) {
      getAllPresentStatesOptions(selectedPresentCountry);
    } else {
      setPresentStateOptions([]);
      setPresentCityOptions([]);
      setValue("present_state_id", "");
      setValue("present_city_id", "");
    }
  }, [selectedPresentCountry]);

  // Get Present City on Present Country & City Change
  useEffect(() => {
    if (selectedPresentCountry && selectedPresentState) {
      getAllPresentCitiesOptions(selectedPresentCountry, selectedPresentState);
    } else {
      setPresentCityOptions([]);
    }
  }, [selectedPresentCountry, selectedPresentState]);

  // Get Permanent State on Permanent Country Change
  useEffect(() => {
    if (selectedPermanentCountry) {
      getAllPermanentStatesOptions(selectedPermanentCountry);
    } else {
      setPermanentStateOptions([]);
      setPermanentCityOptions([]);
      setValue("permanent_state_id", "");
      setValue("permanent_city_id", "");
    }
  }, [selectedPermanentCountry]);

  // Get Permanent City on Permanent Country & City Change
  useEffect(() => {
    if (selectedPermanentCountry && selectedPermanentState) {
      getAllPermanentCitiesOptions(
        selectedPermanentCountry,
        selectedPermanentState
      );
    } else {
      setPermanentCityOptions([]);
    }
  }, [selectedPermanentCountry, selectedPermanentState]);

  // Get All Nationalities on Page Load
  useEffect(() => {
    getAllNationalityOptions();
  }, []);

  // Get All Personal States on Page Load
  useEffect(() => {
    getAllPersonalStatesOptions();
  }, []);

  // Get All Personal Cities on Page Load
  useEffect(() => {
    if (selectedPersonalState) {
      getAllPersonalCityOptions(selectedPersonalState);
    } else {
      setPersonalCityOptions([]);
    }
  }, [selectedPersonalState]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <form action="">
          {/* Present Address */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">Present Address Details</h3>
            </div>
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Present Country */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="present_country_id" className="text-sm">
                      Country
                    </label>
                    <Controller
                      name="present_country_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={countryListOptions || []}
                          value={findSelectedOption(
                            countryListOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setPresentStateOptions([]);
                            setPresentCityOptions([]);
                            setValue("present_state_id", "");
                            setValue("present_city_id", "");
                          }}
                          placeholder="Select country..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Present State */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="present_state_id" className="text-sm">
                      State
                    </label>
                    <Controller
                      name="present_state_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={presentStateOptions || []}
                          value={findSelectedOption(
                            presentStateOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setPresentCityOptions([]);
                            setValue("present_city_id", "");
                          }}
                          placeholder="Select state..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Present City */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="present_city_id" className="text-sm">
                      City
                    </label>
                    <Controller
                      name="present_city_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={presentCityOptions || []}
                          value={findSelectedOption(
                            presentCityOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select city..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Present City */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="present_address" className="text-sm">
                      Address
                    </label>
                    <textarea
                      name="present_address"
                      id="present_address"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter present address..."
                      {...register("present_address")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">Permanent Address Details</h3>
            </div>
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Permanent Country */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="permanent_country_id" className="text-sm">
                      Country
                    </label>
                    <Controller
                      name="permanent_country_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={countryListOptions || []}
                          value={findSelectedOption(
                            countryListOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setPermanentStateOptions([]);
                            setPermanentCityOptions([]);
                            setValue("permanent_state_id", "");
                            setValue("permanent_city_id", "");
                          }}
                          placeholder="Select country..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Permanent State */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="permanent_state_id" className="text-sm">
                      State
                    </label>
                    <Controller
                      name="permanent_state_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={permanentStateOptions || []}
                          value={findSelectedOption(
                            permanentStateOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setPermanentCityOptions([]);
                            setValue("permanent_city_id", "");
                          }}
                          placeholder="Select state..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Permanent City */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="permanent_city_id" className="text-sm">
                      City
                    </label>
                    <Controller
                      name="permanent_city_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={permanentCityOptions || []}
                          value={findSelectedOption(
                            permanentCityOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select city..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Permanent Address */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="permanent_address" className="text-sm">
                      Address
                    </label>
                    <textarea
                      name="permanent_address"
                      id="permanent_address"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter permanent address..."
                      {...register("permanent_address")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">Personal Details</h3>
            </div>
            <div className="flex py-5 px-3 flex-col gap-5">
              {/* Row-1 */}
              <div className="grid grid-cols-12 gap-5">
                {/* Nationality */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nationality" className="text-sm">
                      Nationality
                    </label>
                    <Controller
                      name="nationality"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={nationalityOptions || []}
                          value={findSelectedOption(
                            nationalityOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select nationality..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Personal State */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="personal_state_id" className="text-sm">
                      State
                    </label>
                    <Controller
                      name="personal_state_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={personalStateOptions || []}
                          value={findSelectedOption(
                            personalStateOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setPersonalCityOptions([]);
                            setValue("personal_city_id", "");
                          }}
                          placeholder="Select state..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Personal City */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="personal_city_id" className="text-sm">
                      City
                    </label>
                    <Controller
                      name="personal_city_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={personalCityOptions || []}
                          value={findSelectedOption(
                            personalCityOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select city..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Id Number */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="id_number" className="text-sm">
                      ID Number
                    </label>
                    <input
                      type="text"
                      id="id_number"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter id number..."
                      {...register("id_number")}
                    />
                  </div>
                </div>

                {/* Id Issue Data */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="id_issue_date" className="text-sm">
                      ID Issue Date
                    </label>
                    <input
                      type="date"
                      id="id_issue_date"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter id issue number..."
                      {...register("id_issue_date")}
                    />
                  </div>
                </div>

                {/* Id Expiry Data */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="id_exp_date" className="text-sm">
                      ID Expiry Date
                    </label>
                    <input
                      type="date"
                      id="id_exp_date"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter id expiry number..."
                      {...register("id_exp_date")}
                    />
                  </div>
                </div>

                {/* DIRE Number */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dire_number" className="text-sm">
                      DIRE Number
                    </label>
                    <input
                      type="text"
                      id="dire_number"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter dire number..."
                      {...register("dire_number")}
                    />
                  </div>
                </div>

                {/* Driving License Number */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="driving_license" className="text-sm">
                      Driving License No.
                    </label>
                    <input
                      type="text"
                      id="driving_license"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter license number..."
                      {...register("driving_license")}
                    />
                  </div>
                </div>

                {/* Passport Number */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passport_number" className="text-sm">
                      Passport No.
                    </label>
                    <input
                      type="text"
                      id="passport_number"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter passport number..."
                      {...register("passport_number")}
                    />
                  </div>
                </div>

                {/* Passport Issue Date */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passport_issue_date" className="text-sm">
                      Passport Issue Date.
                    </label>
                    <input
                      type="date"
                      id="passport_issue_date"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter passport issue date..."
                      {...register("passport_issue_date")}
                    />
                  </div>
                </div>

                {/* Passport Expiry Date */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passport_exp_date" className="text-sm">
                      Passport Expiry Date.
                    </label>
                    <input
                      type="date"
                      id="passport_exp_date"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter passport expiry date..."
                      {...register("passport_exp_date")}
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="blood_group" className="text-sm">
                      Blood Group
                    </label>
                    <Controller
                      name="blood_group"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={bloodOptions || []}
                          value={findSelectedOption(bloodOptions, field.value)}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                          }}
                          placeholder="Select blood group..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Tax Number */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="tax_number" className="text-sm">
                      Tax Number
                    </label>
                    <input
                      type="text"
                      id="tax_number"
                      className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                      placeholder="Enter tax number..."
                      {...register("tax_number")}
                    />
                  </div>
                </div>

                {/* Marital Status */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="marital_status" className="text-sm">
                      Marital Status
                    </label>
                    <Controller
                      name="marital_status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={maritalStatusOptions || []}
                          value={findSelectedOption(
                            maritalStatusOptions,
                            field.value
                          )}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setSelectedMaritalStatus(selected?.value || null);
                          }}
                          placeholder="Select marital status..."
                          isClearable
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            ...formSelectStyles,
                            width: "120px",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Tax Number */}
                {selectedMaritalStatus === "Married" && (
                  <div className="col-span-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="spouse_name" className="text-sm">
                        Spouse Name
                      </label>
                      <input
                        type="text"
                        id="spouse_name"
                        className="rounded-lg text-[.8rem] hover:border-borders-inputHover"
                        placeholder="Enter spouse name..."
                        {...register("spouse_name")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
              <h3 className="text-white text-xs">Family Details</h3>
              <button
                type="button"
                onClick={() => setFamilyFormVisible(true)}
                className="text-white hover:text-gray-200 flex items-center text-xs"
              >
                <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
                Family Details
              </button>
            </div>

            {familyDetails?.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
                  <div className="p-2 text-xs font-bold">S.No.</div>
                  <div className="p-2 text-xs font-bold">Member Name</div>
                  <div className="p-2 text-xs font-bold">DOB</div>
                  <div className="p-2 text-xs font-bold text-center">
                    Relation Type
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Contact Number
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Remark
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Emergency Contact
                  </div>
                </div>
                {familyDetails.map((family, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 border-b border-gray-200"
                  >
                    <div className="col-span-3 p-2 text-xs">{index + 1}</div>
                    <div className="col-span-5 p-2 text-xs">
                      {family?.assessment_question_title}
                    </div>
                    <div className="col-span-2 p-2 text-xs">
                      {family?.assessment_question_type === "true/false"
                        ? family?.assessment_correct_answer
                        : family?.assessment_question_options?.find(
                            (opt) => opt.isCorrect
                          )?.option || "N/A"}
                    </div>
                    <div className="col-span-2 p-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleFamilyDetailsRemove(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-md p-4 text-center text-sm text-gray-500">
                No details yet
              </div>
            )}
          </div>

          {/* Previous Employer Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">
                Previous Employement Details
              </h3>
            </div>
            <div className="p-3 overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-7 border-b border-b-gray-300 pb-2">
                  <div className="text-xs font-bold">S.No.</div>
                  <div className="text-xs font-bold">Company Name</div>
                  <div className="text-xs font-bold">From Date</div>
                  <div className="text-xs font-bold">To Date</div>
                  <div className="text-xs font-bold">Last Drawn Salary</div>
                  <div className="text-xs font-bold">Reason of Leaving</div>
                  <div className="text-xs font-bold">Location</div>
                </div>

                <div>
                  {data?.previous_employer_details.length > 0 ? (
                    data?.previous_employer_details.map((company, i) => {
                      return (
                        <div
                          key={company.id}
                          className="grid grid-cols-7 border-b border-b-gray-200 py-2 last:border-none"
                        >
                          <div className="text-xs flex items-center">
                            {i + 1}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.company_name}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.from_date}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.to_date}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.last_drawn_salary}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.reason_of_leaving}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.location}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <p className="text-center text-sm p-3">
                        No Records Found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Family Details Form Modal */}
      <FamilyDetailsItem
        isVisible={familyFormVisible}
        onClose={() => setFamilyFormVisible(false)}
        onAddFamilyRow={handleAddFamilyDetails}
        register={register}
        errors={errors}
        control={control}
      />
    </>
  );
};

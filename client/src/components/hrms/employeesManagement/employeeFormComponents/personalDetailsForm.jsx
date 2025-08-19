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
import { PresentAddressForm } from "./personalDetailsFormComponents/presentAddressForm";
import { PermanentAddressForm } from "./personalDetailsFormComponents/permanentAddressForm";
import { PersonalDataForm } from "./personalDetailsFormComponents/personalDataForm";
import { FamilyDetailsSection } from "./personalDetailsFormComponents/familyDetailsSection";
import { PreviousEmployerSection } from "./personalDetailsFormComponents/previousEmployerSection";

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
    handleComponentView,
    setCreatedUserId,
    updateId,
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
  const [familyFormView, setFamilyFormView] = useState(false);
  const [familyDetails, setFamilyDetails] = useState([]);
  const [familyViewData, setFamilyViewData] = useState(null);
  const [familyEditData, setFamilyEditData] = useState(null);
  const [previousEmployerFormVisible, setPreviousEmployerFormVisible] =
    useState(false);
  const [previousEmployerFormView, setPreviousEmployerFormView] =
    useState(false);
  const [previousEmployerDetails, setPreviousEmployerDetails] = useState([]);
  const [previousEmployerViewData, setPreviousEmployerViewData] =
    useState(null);
  const [previousEmployerEditData, setPreviousEmployerEditData] =
    useState(null);

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

  // Handle Add Family Details
  const handleAddFamilyDetails = (familyData) => {
    setFamilyDetails([...familyDetails, familyData]);
    setFamilyFormVisible(false);
  };

  // Handle Family View Data
  const handleFamilyViewData = (index) => {
    const viewData = familyDetails[index];
    setFamilyViewData(viewData);
  };

  // Handle Family Member Remove
  const handleFamilyDetailsRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this family member?")) {
      const updatedData = familyDetails.filter((item, i) => i !== index);
      setFamilyDetails(updatedData);
    }
  };

  // Handle Family Member Edit
  const handleFamilyDetailsEdit = (index, field, value) => {
    const updated = [...familyDetails];
    updated[index][field] = value;
    setFamilyDetails(updated);
  };

  // Handle Previous Employer View Data
  const handlePreviousEmployerViewData = (index) => {
    const viewData = previousEmployerDetails[index];
    setPreviousEmployerViewData(viewData);
  };

  // Handle Previous Employer Edit
  const handlePreviousEmployerDetailsEdit = (index, field, value) => {
    const updated = [...previousEmployerDetails];
    updated[index][field] = value;
    setPreviousEmployerDetails(updated);
  };

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
        <form action="" className="flex flex-col gap-5">
          {/* Present Address */}
          <PresentAddressForm
            control={control}
            countryListOptions={countryListOptions}
            findSelectedOption={findSelectedOption}
            setPresentStateOptions={setPresentStateOptions}
            setPresentCityOptions={setPresentCityOptions}
            presentStateOptions={presentStateOptions}
            presentCityOptions={presentCityOptions}
            setValue={setValue}
            register={register}
            formSelectStyles={formSelectStyles}
          />

          {/* Permanent Address */}
          <PermanentAddressForm
            control={control}
            setValue={setValue}
            register={register}
            countryListOptions={countryListOptions}
            findSelectedOption={findSelectedOption}
            setPermanentStateOptions={setPermanentStateOptions}
            setPermanentCityOptions={setPermanentCityOptions}
            permanentStateOptions={permanentStateOptions}
            permanentCityOptions={permanentCityOptions}
            formSelectStyles={formSelectStyles}
          />

          {/* Personal Details */}
          <PersonalDataForm
            control={control}
            setValue={setValue}
            register={register}
            formSelectStyles={formSelectStyles}
            nationalityOptions={nationalityOptions}
            findSelectedOption={findSelectedOption}
            personalStateOptions={personalStateOptions}
            setPersonalCityOptions={setPersonalCityOptions}
            personalCityOptions={personalCityOptions}
            bloodOptions={bloodOptions}
            maritalStatusOptions={maritalStatusOptions}
            setSelectedMaritalStatus={setSelectedMaritalStatus}
            selectedMaritalStatus={selectedMaritalStatus}
          />

          {/* Family Details */}
          <FamilyDetailsSection
            register={register}
            errors={errors}
            control={control}
            setFamilyFormVisible={setFamilyFormVisible}
            familyDetails={familyDetails}
            handleFamilyViewData={handleFamilyViewData}
            setFamilyFormView={setFamilyFormView}
            setFamilyEditData={setFamilyEditData}
            handleFamilyDetailsEdit={handleFamilyDetailsEdit}
            handleFamilyDetailsRemove={handleFamilyDetailsRemove}
            familyFormVisible={familyFormVisible}
            handleAddFamilyDetails={handleAddFamilyDetails}
            familyEditData={familyEditData}
            familyFormView={familyFormView}
            setFamilyViewData={setFamilyViewData}
            familyViewData={familyViewData}
          />
          {/* Previous Employer Details */}
          <PreviousEmployerSection
            previousEmployerDetails={previousEmployerDetails}
            setPreviousEmployerEditData={setPreviousEmployerEditData}
            previousEmployerFormVisible={previousEmployerFormVisible}
            previousEmployerEditData={previousEmployerEditData}
            setPreviousEmployerFormVisible={setPreviousEmployerFormVisible}
            setPreviousEmployerFormView={setPreviousEmployerFormView}
            previousEmployerFormView={previousEmployerFormView}
            previousEmployerViewData={previousEmployerViewData}
            setPreviousEmployerViewData={setPreviousEmployerViewData}
            handlePreviousEmployerViewData={handlePreviousEmployerViewData}
            handlePreviousEmployerDetailsEdit={
              handlePreviousEmployerDetailsEdit
            }
          />

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-center gap-5">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                onClick={() => {
                  handleComponentView("listing");
                  setCreatedUserId(null);
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
        </form>
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
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
import { FamilyDetailsAddItem } from "./personalDetailsFormComponents/familyDetailsAddForm";
import { FamilyDetailsViewItem } from "./personalDetailsFormComponents/familyDetailsViewForm";
import { PreviousEmployerDetailsAddItem } from "./personalDetailsFormComponents/previousEmployerDetailsAddForm";
import { PreviousEmployerDetailsViewItem } from "./personalDetailsFormComponents/previousEmployerDetailsViewForm";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

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
      familyDetails: [],
      previousEmployerDetails: [],
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
  const [familyDetails, setFamilyDetails] = useState([]);
  const [familyFormVisible, setFamilyFormVisible] = useState(false);
  const [familyFormView, setFamilyFormView] = useState(false);
  const [familyViewData, setFamilyViewData] = useState(null);
  const [familyEditData, setFamilyEditData] = useState(null);
  const [previousEmployerDetails, setPreviousEmployerDetails] = useState([]);
  const [previousEmployerFormVisible, setPreviousEmployerFormVisible] =
    useState(false);
  const [previousEmployerFormView, setPreviousEmployerFormView] =
    useState(false);
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

  // Handle Add Previous Employer Details
  const handleAddPreviousEmployerDetails = (previousEmployerData) => {
    if (previousEmployerEditData) {
      const updated = previousEmployerDetails.map((item, i) =>
        i === previousEmployerEditData.index ? previousEmployerData : item
      );
      setPreviousEmployerDetails(updated);
    } else {
      setPreviousEmployerDetails([
        ...previousEmployerDetails,
        previousEmployerData,
      ]);
    }
    setPreviousEmployerFormVisible(false);
    setPreviousEmployerEditData(null);
  };

  // Handle Previous Employer View Data
  const handlePreviousEmployerViewData = (index) => {
    const viewData = previousEmployerDetails[index];
    setPreviousEmployerViewData(viewData);
  };

  // Handle Previous Employer Remove
  const handlePreviousEmployerDetailsRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this details?")) {
      const updatedData = previousEmployerDetails.filter(
        (item, i) => i !== index
      );
      setPreviousEmployerDetails(updatedData);
    }
  };

  // Handle Previous Employer Edit
  const handlePreviousEmployerDetailsEdit = (index, field, value) => {
    const updated = [...previousEmployerDetails];
    updated[index][field] = value;
    setPreviousEmployerDetails(updated);
  };

  /// Handle Form Submission
  const onSubmit = (data) => {};

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Present Address */}
          <PresentAddressForm
            control={control}
            errors={errors}
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
            errors={errors}
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
            errors={errors}
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
                <div className="min-w-[1000px]">
                  <div className="flex bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
                    <div className="p-2 text-xs font-bold w-[100px] border-e border-e-gray-400 text-center">
                      S.No.
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Member Name
                    </div>
                    <div className="p-2 text-xs font-bold w-[150px] border-e border-e-gray-400 text-center">
                      DOB
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Relation Type
                    </div>
                    <div className="p-2 text-xs font-bold w-[250px] border-e border-e-gray-400 text-center">
                      Contact Number
                    </div>
                    <div className="p-2 text-xs font-bold  w-[300px] border-e border-e-gray-400 text-center">
                      Remark
                    </div>
                    <div className="p-2 text-xs font-bold text-center w-[200px] border-e border-e-gray-400 text-center">
                      Emergency Contact
                    </div>
                    <div className="p-2 text-xs font-bold text-center w-[200px] text-center">
                      Action
                    </div>
                  </div>
                  {familyDetails.map((family, index) => (
                    <div key={index} className="flex border-b border-gray-200">
                      <div className="px-2 py-5 text-xs w-[100px] border-e border-e-gray-300 text-center">
                        {index + 1}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {family?.member_name}
                      </div>
                      <div className="px-2 py-5 text-xs w-[150px] border-e border-e-gray-300 text-center">
                        {family?.dob}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {family?.relation_type}
                      </div>
                      <div className="px-2 py-5 text-xs w-[250px] border-e border-e-gray-300 text-center">
                        {family?.contact_number}
                      </div>
                      <div className="px-2 py-5 text-xs w-[300px] border-e border-e-gray-300">
                        {family?.remark}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {family?.selected_as_emergency ? (
                          <span className="text-green-500 text-xs">Yes</span>
                        ) : (
                          <span className="text-red-500 text-xs">No</span>
                        )}
                      </div>
                      <div className="px-2 py-5 flex justify-center gap-2 w-[200px]">
                        <button
                          type="button"
                          onClick={() => {
                            handleFamilyViewData(index);
                            setFamilyFormView(true);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FaEye className="text-xl" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFamilyEditData(familyDetails[index]);
                            setFamilyFormVisible(true);
                            handleFamilyDetailsEdit(index);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdEdit className="text-xl" />
                        </button>
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
              </div>
            ) : (
              <div className="border border-gray-200 rounded-md p-4 text-center text-sm text-gray-500">
                No Records Found
              </div>
            )}
          </div>

          {/* Previous Employer Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
              <h3 className="text-white text-xs">Previous Employer Details</h3>
              <button
                type="button"
                onClick={() => setPreviousEmployerFormVisible(true)}
                className="text-white hover:text-gray-200 flex items-center text-xs"
              >
                <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
                Previous Employer Details
              </button>
            </div>

            {previousEmployerDetails?.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
                  <div className="p-2 text-xs font-bold">S.No.</div>
                  <div className="p-2 text-xs font-bold">Company Name</div>
                  <div className="p-2 text-xs font-bold">From Date</div>
                  <div className="p-2 text-xs font-bold text-center">
                    To Date
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Last Drawn Salary
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Location
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Reason of Leaving
                  </div>
                  <div className="p-2 text-xs font-bold text-center">
                    Action
                  </div>
                </div>
                {previousEmployerDetails.map((employer, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 border-b border-gray-200"
                  >
                    <div className="p-2 text-xs">{index + 1}</div>
                    <div className="p-2 text-xs">{employer?.company_name}</div>
                    <div className="p-2 text-xs">{employer?.from_date}</div>
                    <div className="p-2 text-xs">{employer?.to_date}</div>
                    <div className="p-2 text-xs">
                      {employer?.last_drawn_salary}
                    </div>
                    <div className="p-2 text-xs">{employer?.location}</div>
                    <div className="p-2 text-xs text-center">
                      {employer?.reason_of_leaving}
                    </div>
                    <div className="p-2 flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handlePreviousEmployerViewData(index);
                          setPreviousEmployerFormView(true);
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <FaEye className="text-xl" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviousEmployerEditData(
                            previousEmployerDetails[index]
                          );
                          setPreviousEmployerFormVisible(true);
                          handlePreviousEmployerDetailsEdit(index);
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handlePreviousEmployerDetailsRemove(index)
                        }
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
                No Records Found
              </div>
            )}
          </div>

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

      {/* Family Details Form Modal */}
      <FamilyDetailsAddItem
        isVisible={familyFormVisible}
        onClose={() => {
          setFamilyEditData(null);
          setFamilyFormVisible(false);
        }}
        onAddFamilyRow={handleAddFamilyDetails}
        updateData={familyEditData}
        register={register}
        errors={errors}
        control={control}
      />

      {/* Family Details View Form Modal */}
      <FamilyDetailsViewItem
        isView={familyFormView}
        onClose={() => {
          setFamilyViewData(null);
          setFamilyFormView(false);
        }}
        viewData={familyViewData}
      />

      {/* Previous Employer Form Modal */}
      <PreviousEmployerDetailsAddItem
        isVisible={previousEmployerFormVisible}
        onClose={() => {
          setPreviousEmployerEditData(null);
          setPreviousEmployerFormVisible(false);
        }}
        setPreviousEmployerFormVisible={setPreviousEmployerFormVisible}
        onAddNewRow={handleAddPreviousEmployerDetails}
        updateData={previousEmployerEditData}
      />

      {/* Previous Employer View Form Modal */}
      <PreviousEmployerDetailsViewItem
        isView={previousEmployerFormView}
        onClose={() => {
          setPreviousEmployerViewData(null);
          setPreviousEmployerFormView(false);
        }}
        viewData={previousEmployerViewData}
      />
    </>
  );
};

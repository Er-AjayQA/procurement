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
import {
  createEmployee,
  updateEmployee,
} from "../../../../services/hrms_services/service";

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
  const selectedPermanentCountry = watch("permanent_country_id");
  const selectedPermanentState = watch("permanent_state_id");
  const selectedPersonalState = watch("personal_state_id");

  const {
    data,
    getAllData,
    tabType,
    countryListOptions,
    formSelectStyles,
    bloodOptions,
    maritalStatusOptions,
    handleComponentView,
    createdUserId,
    setCreatedUserId,
    updateId,
    handleTabClick,
  } = useEmployeeContext();

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
  const [updateIndex, setUpdateIndex] = useState(null);
  const [datesValidationsError, setDatesValidationsError] = useState({
    idDatesError: false,
    passportDatesError: false,
  });

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  // Get All Present State Options
  const getAllPresentStatesOptions = async (id, state) => {
    try {
      if (!id) {
        state([]);
        return;
      }
      const response = await getAllStates({
        limit: 500000,
        page: "",
        filter: {
          country_id: id,
          name: "",
        },
      });

      if (response.success) {
        state(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      state([]);
      toast.error(error.message || "Failed to load states");
    }
  };

  // Get All Present Cities Options
  const getAllPresentCitiesOptions = async (countryId, stateId, state) => {
    try {
      if (!countryId || !stateId) {
        state([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: stateId,
          country_id: countryId,
          name: "",
        },
      });

      if (response.success) {
        state(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      state([]);
      toast.error(error.message || "Failed to load Cities");
    }
  };

  // Get All Permanent State Options
  const getAllPermanentStatesOptions = async (countryId, state) => {
    try {
      if (!countryId) {
        state([]);
        return;
      }
      const response = await getAllStates({
        limit: 500000,
        page: "",
        filter: {
          country_id: countryId,
          name: "",
        },
      });

      if (response.success) {
        state(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      state([]);
      toast.error(error.message || "Failed to load states");
    }
  };

  // Get All Permanent Cities Options
  const getAllPermanentCitiesOptions = async (countryId, stateId, state) => {
    try {
      if (!countryId || !stateId) {
        state([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: stateId,
          country_id: countryId,
          name: "",
        },
      });

      if (response.success) {
        state(
          response.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      state([]);
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
  const handleFamilyDetailsEdit = (updatedData, index) => {
    setFamilyDetails((prev) =>
      prev.map((item, i) => (i === index ? updatedData : item))
    );
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
  const handlePreviousEmployerDetailsEdit = (updatedData, index) => {
    setPreviousEmployerDetails((prev) =>
      prev.map((item, i) => (i === index ? updatedData : item))
    );
  };

  /// Handle Form Submission
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      if (datesValidationsError.idDatesError) {
        toast.error("ID Issue Date must be smaller than ID Expiry Date!");
        return;
      }

      if (datesValidationsError.passportDatesError) {
        toast.error(
          "Passport Issue Date must be smaller than Passport Expiry Date!"
        );
        return;
      }

      const payload = {
        tab_type: tabType,
        user_id: createdUserId,
        present_country_id: data?.present_country_id,
        present_state_id: data?.present_state_id,
        present_city_id: data?.present_city_id,
        present_address: data?.present_address,
        permanent_country_id: data?.permanent_country_id,
        permanent_state_id: data?.permanent_state_id,
        permanent_city_id: data?.permanent_city_id,
        permanent_address: data?.permanent_address,
        nationality: data?.nationality,
        personal_state_id: data?.personal_state_id,
        personal_city_id: data?.personal_city_id,
        dire_number: data?.dire_number,
        driving_license: data?.driving_license,
        blood_group: data?.blood_group,
        id_number: data?.id_number,
        id_issue_date: data?.id_issue_date,
        id_exp_date: data?.id_exp_date,
        passport_number: data?.passport_number,
        passport_issue_date: data?.passport_issue_date,
        passport_exp_date: data?.passport_exp_date,
        tax_number: data?.tax_number,
        marital_status: data?.marital_status,
        spouse_name: data?.spouse_name,
        family_details: familyDetails,
        previous_employer_details: previousEmployerDetails,
      };

      let response;

      if (updateId) {
        response = await updateEmployee(updateId, payload);
      } else {
        response = await createEmployee(payload);
      }
      if (response.success) {
        toast.success(response.message);
        handleTabClick("salary_details");
        getAllData();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Get All Nationalities on Page Load
  useEffect(() => {
    getAllNationalityOptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Present Address */}
          <PresentAddressForm
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
            reset={reset}
            watch={watch}
            countryListOptions={countryListOptions}
            findSelectedOption={findSelectedOption}
            getAllPresentStatesOptions={getAllPresentStatesOptions}
            getAllPresentCitiesOptions={getAllPresentCitiesOptions}
            formSelectStyles={formSelectStyles}
          />

          {/* Permanent Address */}
          <PermanentAddressForm
            control={control}
            setValue={setValue}
            register={register}
            reset={reset}
            errors={errors}
            watch={watch}
            countryListOptions={countryListOptions}
            findSelectedOption={findSelectedOption}
            getAllPermanentStatesOptions={getAllPermanentStatesOptions}
            getAllPermanentCitiesOptions={getAllPermanentCitiesOptions}
            formSelectStyles={formSelectStyles}
          />

          {/* Personal Details */}
          <PersonalDataForm
            control={control}
            setValue={setValue}
            register={register}
            reset={reset}
            errors={errors}
            watch={watch}
            formSelectStyles={formSelectStyles}
            nationalityOptions={nationalityOptions}
            findSelectedOption={findSelectedOption}
            bloodOptions={bloodOptions}
            maritalStatusOptions={maritalStatusOptions}
            setSelectedMaritalStatus={setSelectedMaritalStatus}
            selectedMaritalStatus={selectedMaritalStatus}
            datesValidationsError={datesValidationsError}
            setDatesValidationsError={setDatesValidationsError}
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
              <div className="border border-gray-200 rounded-md overflow-x-auto">
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
                          <FaEye className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFamilyEditData(familyDetails[index]);
                            setFamilyFormVisible(true);
                            setUpdateIndex(index);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdEdit className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFamilyDetailsRemove(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdDelete className="text-xl w-[15px] h-[15px]" />
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
              <div className="border border-gray-200 rounded-md overflow-x-auto">
                <div className="min-w-[1500px]">
                  <div className="flex bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
                    <div className="p-2 text-xs font-bold w-[150px] border-e border-e-gray-400 text-center">
                      S.No.
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Company Name
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      From Date
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      To Date
                    </div>
                    <div className="p-2 text-xs font-bold w-[250px] border-e border-e-gray-400 text-center">
                      Last Drawn Salary
                    </div>
                    <div className="p-2 text-xs font-bold w-[200px] border-e border-e-gray-400 text-center">
                      Location
                    </div>
                    <div className="p-2 text-xs font-bold w-[300px] border-e border-e-gray-400 text-center">
                      Reason of Leaving
                    </div>
                    <div className="p-2 text-xs font-bold text-center w-[200px]">
                      Action
                    </div>
                  </div>
                  {previousEmployerDetails.map((employer, index) => (
                    <div key={index} className="flex border-b border-gray-200">
                      <div className="px-2 py-5 text-xs w-[150px] border-e border-e-gray-300 text-center">
                        {index + 1}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.company_name}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.from_date}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.to_date}
                      </div>
                      <div className="px-2 py-5 text-xs w-[250px] border-e border-e-gray-300 text-center">
                        {employer?.last_drawn_salary}
                      </div>
                      <div className="px-2 py-5 text-xs w-[200px] border-e border-e-gray-300 text-center">
                        {employer?.location}
                      </div>
                      <div className="px-2 py-5 text-xs w-[300px] border-e border-e-gray-300">
                        {employer?.reason_of_leaving}
                      </div>
                      <div className="px-2 py-5 flex justify-center gap-2 w-[200px] text-center">
                        <button
                          type="button"
                          onClick={() => {
                            handlePreviousEmployerViewData(index);
                            setPreviousEmployerFormView(true);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FaEye className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviousEmployerEditData(
                              previousEmployerDetails[index]
                            );
                            setPreviousEmployerFormVisible(true);
                            setUpdateIndex(index);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdEdit className="text-xl w-[15px] h-[15px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePreviousEmployerDetailsRemove(index)
                          }
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MdDelete className="text-xl w-[15px] h-[15px]" />
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

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-center gap-5">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg"
                onClick={() => {
                  handleComponentView("listing");
                  setCreatedUserId(null);
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
        onUpdateFamilyRow={handleFamilyDetailsEdit}
        updateData={familyEditData}
        updateIndex={updateIndex}
        setUpdateIndex={setUpdateIndex}
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
        onUpdateRow={handlePreviousEmployerDetailsEdit}
        updateIndex={updateIndex}
        setUpdateIndex={setUpdateIndex}
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

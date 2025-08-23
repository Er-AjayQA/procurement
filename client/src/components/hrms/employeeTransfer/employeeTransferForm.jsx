import { useState } from "react";
import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeeTransferForm = () => {
  const { data, handleTabClick, tabType, handleComponentView } =
    useEmployeeTransferContext();

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
        payload.user_id = createdUserId;
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

  return (
    <>
      <div className="flex flex-col">
        {/* Employee Details Form */}
        <div className="py-5">
          <div className="flex flex-col gap-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
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
        </div>
      </div>
    </>
  );
};

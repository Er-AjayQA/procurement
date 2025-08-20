import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import {
  getAllCities,
  getAllStates,
} from "../../../../../services/master_services/service";
import { toast } from "react-toastify";

export const PersonalDataForm = ({
  control,
  setValue,
  register,
  errors,
  watch,
  formSelectStyles,
  nationalityOptions,
  findSelectedOption,
  bloodOptions,
  maritalStatusOptions,
  setSelectedMaritalStatus,
  selectedMaritalStatus,
}) => {
  const [personalStateOptions, setPersonalStateOptions] = useState([]);
  const [personalCityOptions, setPersonalCityOptions] = useState([]);

  // Watch the present country and state values
  const selectedPersonalState = watch("personal_state_id");

  // Get All Personal State Options
  const getAllPersonalStatesOptions = async () => {
    try {
      const response = await getAllStates({
        limit: 50000000,
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
  const getAllPersonalCityOptions = async (stateId) => {
    try {
      if (!stateId) {
        setPersonalCityOptions([]);
        return;
      }
      const response = await getAllCities({
        limit: 500000,
        page: "",
        filter: {
          state_id: stateId,
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

  // Get All Personal States on Page Load
  useEffect(() => {
    getAllPersonalStatesOptions();
  }, []);

  // Get All Personal Cities on Page Load
  useEffect(() => {
    if (selectedPersonalState) {
      getAllPersonalCityOptions(selectedPersonalState);
    }
  }, [selectedPersonalState]);

  useEffect(() => {
    if (selectedPersonalState === undefined) {
      setValue("personal_city_id", null);
      setPersonalCityOptions([]);
    }
  }, [selectedPersonalState, setValue]);

  return (
    <>
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
                        field.onChange(selected?.value || null);
                        setValue("personal_city_id", null);
                        setPersonalCityOptions([]);
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
                        field.onChange(selected?.value || null);
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
                  {...register("id_number", { required: "ID is required" })}
                />
                {errors.id_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.id_number.message}
                  </p>
                )}
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
                  {...register("id_issue_date", {
                    required: "Id Issue date is required!",
                  })}
                />
                {errors.id_issue_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.id_issue_date.message}
                  </p>
                )}
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
                  {...register("id_exp_date", {
                    required: "Id expiry date is required!",
                  })}
                />
                {errors.id_exp_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.id_exp_date.message}
                  </p>
                )}
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
                  {...register("passport_number", {
                    required: "Passport number is required!",
                  })}
                />
                {errors.passport_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.passport_number.message}
                  </p>
                )}
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
                  {...register("passport_issue_date", {
                    required: "Passport issue date is required!",
                  })}
                />
                {errors.passport_issue_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.passport_issue_date.message}
                  </p>
                )}
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
                  {...register("passport_exp_date", {
                    required: "Passport expiry date is required!",
                  })}
                />
                {errors.passport_exp_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.passport_exp_date.message}
                  </p>
                )}
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
                  {...register("tax_number", {
                    required: "Tax number is required!",
                  })}
                />
                {errors.tax_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tax_number.message}
                  </p>
                )}
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
    </>
  );
};

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const PermanentAddressForm = ({
  control,
  setValue,
  register,
  reset,
  watch,
  countryListOptions,
  findSelectedOption,
  getAllPermanentStatesOptions,
  getAllPermanentCitiesOptions,
  formSelectStyles,
}) => {
  const { data, updateId } = useEmployeeContext();
  const [permanentStateOptions, setPermanentStateOptions] = useState([]);
  const [permanentCityOptions, setPermanentCityOptions] = useState([]);
  const [isDataInitialized, setIsDataInitialized] = useState(false);

  // Watch the present country and state values
  const selectedPermanentCountry = watch("permanent_country_id");
  const selectedPermanentState = watch("permanent_state_id");

  // Updating fields when in update mode
  useEffect(() => {
    if (updateId && data && !isDataInitialized) {
      const setUpdateDefaultData = async () => {
        setValue("permanent_address", data?.permanent_address || "");

        if (data?.permanent_country_id) {
          const countryOption = countryListOptions?.find(
            (item) => item.value == data.permanent_country_id
          );

          if (countryOption) {
            setValue("permanent_country_id", countryOption.value);

            await getAllPermanentStatesOptions(
              data?.permanent_country_id,
              setPermanentStateOptions
            );

            setTimeout(() => {
              if (data?.permanent_state_id) {
                const stateOption = permanentStateOptions?.find(
                  (item) => item.value == data.permanent_state_id
                );

                if (stateOption) {
                  setValue("permanent_state_id", stateOption.value);

                  getAllPermanentCitiesOptions(
                    data?.permanent_country_id,
                    data?.permanent_state_id,
                    setPermanentCityOptions
                  );

                  setTimeout(() => {
                    if (data?.permanent_city_id) {
                      const cityOption = permanentCityOptions?.find(
                        (item) => item.value == data.permanent_city_id
                      );

                      if (cityOption) {
                        setValue("permanent_city_id", cityOption.value);
                      }
                    }
                  }, 3000);
                }
              }
            }, 3000);
          }
        }
        setIsDataInitialized(true);
      };
      setUpdateDefaultData();
    }
  }, [updateId, data, countryListOptions, isDataInitialized]);

  // Get Permanent State on Permanent Country Change
  useEffect(() => {
    if (selectedPermanentCountry) {
      getAllPermanentStatesOptions(
        selectedPermanentCountry,
        setPermanentStateOptions
      );
    } else {
      setPermanentStateOptions([]);
      setPermanentCityOptions([]);
      setValue("permanent_state_id", null);
      setValue("permanent_city_id", null);
    }
  }, [selectedPermanentCountry, updateId]);

  // Get Permanent City on Permanent Country & City Change
  useEffect(() => {
    if (selectedPermanentCountry && selectedPermanentState) {
      getAllPermanentCitiesOptions(
        selectedPermanentCountry,
        selectedPermanentState,
        setPermanentCityOptions
      );
    } else {
      setPermanentCityOptions([]);
    }
  }, [selectedPermanentCountry, selectedPermanentState, updateId]);

  useEffect(() => {
    if (selectedPermanentCountry === undefined) {
      setValue("permanent_state_id", null);
      setValue("permanent_city_id", null);
      setPermanentStateOptions([]);
      setPermanentCityOptions([]);
    }
  }, [selectedPermanentCountry, setValue, updateId]);

  useEffect(() => {
    if (selectedPermanentState === undefined) {
      setValue("permanent_city_id", null);
      setPermanentCityOptions([]);
    }
  }, [selectedPermanentState, setValue, updateId]);

  return (
    <>
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
                        setValue("permanent_state_id", null);
                        setValue("permanent_city_id", null);
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
                        setValue("permanent_city_id", null);
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
    </>
  );
};

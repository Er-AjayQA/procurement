import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const PresentAddressForm = ({
  control,
  errors,
  setValue,
  register,
  reset,
  watch,
  getAllPresentStatesOptions,
  getAllPresentCitiesOptions,
  countryListOptions,
  findSelectedOption,
  formSelectStyles,
}) => {
  const { data, updateId } = useEmployeeContext();
  const [presentStateOptions, setPresentStateOptions] = useState([]);
  const [presentCityOptions, setPresentCityOptions] = useState([]);

  // Watch the present country and state values
  const selectedPresentCountry = watch("present_country_id");
  const selectedPresentState = watch("present_state_id");

  // Updating fields when in update mode
  useEffect(() => {
    if (updateId && data) {
      reset({
        present_address: data?.present_address || "",
      });

      const setUpdateDefaultData = async () => {
        if (data?.present_country_id) {
          const option = countryListOptions?.find(
            (item) => item.value === data.present_country_id
          );

          if (option) {
            setValue("present_country_id", option.value);
          }
        }

        if (data?.present_state_id) {
          const option = presentStateOptions?.find(
            (item) => item.value === data.present_state_id
          );

          if (option) {
            setValue("present_state_id", option.value);
          }
        }

        if (data?.present_city_id) {
          const option = presentCityOptions?.find(
            (item) => item.value === data.present_city_id
          );

          if (option) {
            setValue("present_city_id", option.value);
          }
        }
      };
      setUpdateDefaultData();
    }
  }, [updateId, data]);

  // Get Present State on Present Country Change
  useEffect(() => {
    if (selectedPresentCountry) {
      getAllPresentStatesOptions(
        selectedPresentCountry,
        setPresentStateOptions
      );
    } else {
      setPresentStateOptions([]);
      setPresentCityOptions([]);
      setValue("present_state_id", null);
      setValue("present_city_id", null);
    }
  }, [selectedPresentCountry, updateId]);

  // Get Present City on Present Country & City Change
  useEffect(() => {
    if (selectedPresentCountry && selectedPresentState) {
      getAllPresentCitiesOptions(
        selectedPresentCountry,
        selectedPresentState,
        setPresentCityOptions
      );
    } else {
      setPresentCityOptions([]);
    }
  }, [selectedPresentCountry, selectedPresentState, updateId]);

  useEffect(() => {
    if (selectedPresentCountry === undefined) {
      setValue("present_state_id", null);
      setValue("present_city_id", null);
      setPresentStateOptions([]);
      setPresentCityOptions([]);
    }
  }, [selectedPresentCountry, setValue, updateId]);

  useEffect(() => {
    if (selectedPresentState === undefined) {
      setValue("present_city_id", null);
      setPresentCityOptions([]);
    }
  }, [selectedPresentState, setValue, updateId]);

  return (
    <>
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
                        setValue("present_state_id", null);
                        setValue("present_city_id", null);
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
                        setValue("present_city_id", null);
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

            {/* Present Address */}
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
    </>
  );
};

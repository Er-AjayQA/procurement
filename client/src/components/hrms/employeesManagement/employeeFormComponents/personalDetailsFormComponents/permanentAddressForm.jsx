import { Controller } from "react-hook-form";
import Select from "react-select";

export const PermanentAddressForm = ({
  control,
  setValue,
  register,
  countryListOptions,
  findSelectedOption,
  setPermanentStateOptions,
  setPermanentCityOptions,
  permanentStateOptions,
  permanentCityOptions,
  formSelectStyles,
}) => {
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
    </>
  );
};

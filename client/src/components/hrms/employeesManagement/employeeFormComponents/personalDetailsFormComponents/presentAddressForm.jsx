import { Controller } from "react-hook-form";
import Select from "react-select";

export const PresentAddressForm = ({
  control,
  countryListOptions,
  findSelectedOption,
  setPresentStateOptions,
  setPresentCityOptions,
  presentStateOptions,
  presentCityOptions,
  setValue,
  register,
  formSelectStyles,
}) => {
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

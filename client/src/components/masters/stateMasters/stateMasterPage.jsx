import { useState } from "react";
import { AddButton } from "../../UI/addButtonUi";
import Select from "react-select";
import { StateMasterForm } from "./stateMasterForm";
import { StateMasterListing } from "./stateMasterListing";
import { StateMasterView } from "./stateMasterView";
import { useStateMasterContext } from "../../../contextApis/useMastersContextFile";

export const StateMasterPage = () => {
  const {
    handleLimitChange,
    handleChangeFilter,
    selectedCountryDropdown,
    handleSelectCountry,
    countryOptions,
    handleFormVisibility,
    handleViewVisibility,
  } = useStateMasterContext();
  return (
    <>
      <div className="px-5 h-full">
        <div className="flex justify-between items-center pt-3 pb-10">
          <div className="flex items-center gap-5">
            {/* Sorting Element Start */}
            <div className="flex justify-center items-center gap-2">
              <label htmlFor="limit" className="text-sm">
                Limit
              </label>
              <select
                id="limit"
                className="rounded-md py-1 text-sm border-borders-light"
                onChange={(e) => handleLimitChange(e)}
              >
                <option value={10} className="text-sm">
                  10
                </option>
                <option value={50} className="text-sm">
                  50
                </option>
                <option value={100} className="text-sm">
                  100
                </option>
                <option value={500} className="text-sm">
                  500
                </option>
              </select>
            </div>
            {/* Sorting Element End */}
            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Search here.."
                className="py-1 px-2 rounded-md text-sm border-borders-light"
                onChange={(e) => handleChangeFilter(e)}
              />

              <Select
                value={selectedCountryDropdown}
                onChange={handleSelectCountry}
                options={countryOptions}
                placeholder="Search by country..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "32px",
                    height: "32px",
                    borderRadius: "0.375rem",
                    borderColor: "#d1d5db", // gray-300
                    fontSize: "0.875rem", // text-sm
                    paddingLeft: "0.5rem", // px-2
                    paddingRight: "0.5rem", // px-2
                    "&:hover": {
                      borderColor: "#d1d5db", // gray-300
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "4px",
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    padding: "4px",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: "0px",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                  }),
                  option: (base) => ({
                    ...base,
                    fontSize: "0.875rem", // text-sm
                  }),
                }}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Upload States" />
          </div>
        </div>

        {/* Sates Form */}
        <StateMasterForm onClose={() => handleFormVisibility("close")} />

        {/* Sates Listing */}
        <StateMasterListing />

        {/* Sates View */}
        <StateMasterView onClose={() => handleViewVisibility("close")} />
      </div>
    </>
  );
};

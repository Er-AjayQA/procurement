import { AddButton } from "../../UI/addButtonUi";
import Select from "react-select";
import { CityMasterForm } from "./cityMasterForm";
import { CityMasterListing } from "./cityMasterListing";
import { CityMasterView } from "./cityMasterView";
import { useCityMasterContext } from "../../../contextApis/useMastersContextFile";

export const CityMasterPage = () => {
  const {
    handleLimitChange,
    handleChangeFilter,
    selectedStateDropdown,
    handleSelectState,
    stateOptions,
    selectedCountryDropdown,
    handleSelectCountry,
    countryOptions,
    filterDropdownStyle,
    handleFormVisibility,
    handleViewVisibility,
  } = useCityMasterContext();
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
                value={selectedStateDropdown}
                onChange={handleSelectState}
                options={stateOptions}
                placeholder="Search by state..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={filterDropdownStyle}
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
                styles={filterDropdownStyle}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Upload Cities" />
          </div>
        </div>

        {/* Cities Form */}
        <CityMasterForm onClose={() => handleFormVisibility("close")} />

        {/* Cities Listing */}
        <CityMasterListing />

        {/* Cities View */}
        <CityMasterView onClose={() => handleViewVisibility("close")} />
      </div>
    </>
  );
};

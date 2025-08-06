import { useEffect, useState } from "react";
import { AddButton } from "../../components/UI/addButtonUi";
import Select from "react-select";
import {
  getAllCities,
  getAllCountries,
  getAllStates,
  getCityById,
} from "../../services/master_services/service";
import { CityMasterForm } from "../../components/masters/cityMasters/cityMasterForm";
import { CityMasterListing } from "../../components/masters/cityMasters/cityMasterListing";
import { CityMasterView } from "../../components/masters/cityMasters/cityMasterView";

export const CityMasterPage = () => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [filter, setFilter] = useState({
    name: "",
    country_id: "",
    state_id: "",
  });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [selectedStateDropdown, setSelectedStateDropdown] = useState(null);
  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(null);
  const [stateOptions, setStateOptions] = useState(null);
  const [countryOptions, setCountryOptions] = useState(null);

  // Get All Master Data
  const getAllData = async () => {
    setIsLoading(true);
    const data = await getAllCities({ limit, page, filter });

    if (data.success) {
      setIsLoading(false);
      setListing(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      setIsLoading(false);
      setListing([]);
    }
  };

  // Get State List
  const getStatesList = async () => {
    const response = await getAllStates({ limit: 50000, page: "" });

    if (response.success) {
      setStateOptions((prev) => {
        return (
          response.data?.map((state) => ({
            id: state.id,
            value: state.id,
            label: state.name,
          })) || null
        );
      });
    } else {
      setStateOptions(null);
    }
  };

  // Get Countries List
  const getCountriesList = async () => {
    const response = await getAllCountries({ limit: 500, page: "" });

    if (response.success) {
      setCountryOptions((prev) => {
        return (
          response.data?.map((country) => ({
            id: country.id,
            value: country.id,
            label: country.name,
          })) || null
        );
      });
    } else {
      setCountryOptions(null);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getCityById(viewId);
    if (response.success) {
      setData(response.data[0]);
    }
  };

  // Handle Form Visibility
  const handleFormVisibility = (visibility) => {
    if (visibility === "open") {
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
    }
  };

  // Handle Set Limit
  const handleLimitChange = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  // Handle Filter Value
  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, name: e.target.value }));
  };

  // Handle State Select
  const handleSelectState = (selectedOption) => {
    setSelectedStateDropdown(selectedOption);
    setFilter((prev) => ({ ...prev, state_id: selectedOption?.id || "" }));
  };

  // Handle Country Select
  const handleSelectCountry = (selectedOption) => {
    setSelectedCountryDropdown(selectedOption);
    setFilter((prev) => ({ ...prev, country_id: selectedOption?.id || "" }));
  };

  // Handle View Form Visibility
  const handleViewVisibility = (type) => {
    if (type === "open") {
      setViewVisibility(true);
    } else if (type === "close") {
      setViewVisibility(false);
      setViewId(null);
      setData(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (viewId) {
      getDataById();
    }
  }, [viewId]);

  useEffect(() => {
    getStatesList();
    getCountriesList();
  }, []);

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
            <AddButton text="Upload Cities" />
          </div>
        </div>

        {/* Cities Form */}
        <CityMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close")}
          getAllData={getAllData}
          data={data}
        />

        {/* Cities Listing */}
        <CityMasterListing
          isLoading={isLoading}
          listing={listing}
          handleFormVisibility={handleFormVisibility}
          setViewId={setViewId}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          setViewVisibility={setViewVisibility}
        />

        {/* Cities View */}
        <CityMasterView
          viewVisibility={viewVisibility}
          onClose={() => handleViewVisibility("close")}
          data={data}
        />
      </div>
    </>
  );
};

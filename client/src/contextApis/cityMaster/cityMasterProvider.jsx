import { useEffect, useState } from "react";
import { CityMasterContext } from "./cityMasterContext";
import {
  getAllCities,
  getAllCountries,
  getAllStates,
  getCityById,
} from "../../services/master_services/service";

export const CityMasterProvider = ({ children }) => {
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
    try {
      setIsLoading(true);
      const data = await getAllCities({ limit, page, filter });

      if (data?.success) {
        setListing(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setTotalPages(null);
        setListing(null);
      }
    } catch (error) {
      setTotalPages(null);
      setListing(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Get State List
  const getStatesList = async () => {
    try {
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
    } catch (error) {
      setStateOptions(null);
    }
  };

  // Get Countries List
  const getCountriesList = async () => {
    const response = await getAllCountries({
      limit: 500,
      page: "",
      filter: { name: "" },
    });

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

  const filterDropdownStyle = {
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
  };

  const contextValue = {
    listing,
    formVisibility,
    data,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    viewVisibility,
    selectedStateDropdown,
    selectedCountryDropdown,
    stateOptions,
    countryOptions,
    viewId,
    filterDropdownStyle,
    getAllData,
    getDataById,
    handleFormVisibility,
    handleViewVisibility,
    handleLimitChange,
    handleChangeFilter,
    handleSelectCountry,
    handleSelectState,
    setPage,
    setViewId,
    setViewVisibility,
  };

  return (
    <CityMasterContext.Provider value={contextValue}>
      {children}
    </CityMasterContext.Provider>
  );
};

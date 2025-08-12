import { useEffect, useState } from "react";
import { StateMasterContext } from "./stateMasterContext";
import {
  getAllCountries,
  getAllStates,
  getStateById,
} from "../../../services/master_services/service";

export const StateMasterProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [filter, setFilter] = useState({ name: "", country_id: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(null);
  const [countryOptions, setCountryOptions] = useState(null);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllStates({ limit, page, filter });

      if (data.success) {
        setListing(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setTotalPages(null);
        setListing(null);
      }
    } catch (error) {
      setListing(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Get Countries List
  const getCountriesList = async () => {
    try {
      const response = await getAllCountries({
        limit: 500,
        page: "",
        filter: {
          name: "",
        },
      });

      if (response.success) {
        setCountryOptions(
          response.data?.map((country) => ({
            id: country.id,
            value: country.id,
            label: country.name,
          })) || null
        );
      } else {
        setCountryOptions(null);
      }
    } catch (error) {
      setCountryOptions(null);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getStateById(viewId);
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
    getCountriesList();
  }, []);

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
    selectedCountryDropdown,
    formType,
    countryOptions,
    setFormType,
    getAllData,
    getDataById,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    setViewVisibility,
    handleViewVisibility,
    handleSelectCountry,
    setViewId,
    setPage,
  };

  return (
    <StateMasterContext.Provider value={contextValue}>
      {children}
    </StateMasterContext.Provider>
  );
};

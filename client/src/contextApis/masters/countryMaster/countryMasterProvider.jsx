import { useEffect, useState } from "react";
import { CountryMasterContext } from "./countryMasterContext";
import {
  getAllCountries,
  getCountryById,
} from "../../../services/master_services/service";

export const CountryMasterProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [filter, setFilter] = useState({ name: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewVisibility, setViewVisibility] = useState(false);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCountries({ limit, page, filter });

      if (data.success) {
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

  // Get Data By Id
  const getDataById = async () => {
    const response = await getCountryById(viewId);
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
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
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
    getAllData,
    getDataById,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    setViewVisibility,
    handleViewVisibility,
    setViewId,
    setPage,
  };

  return (
    <CountryMasterContext.Provider value={contextValue}>
      {children}
    </CountryMasterContext.Provider>
  );
};

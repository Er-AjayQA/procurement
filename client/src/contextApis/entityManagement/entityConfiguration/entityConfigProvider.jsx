import { useEffect, useState } from "react";
import {
  getAllCountries,
  getAllPhoneCodes,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { EntityConfigContext } from "./entityConfigContext";
import {
  deleteEntity,
  getAllEntityList,
  getEntityById,
  updateEntityStatus,
} from "../../../services/entityManagement_services/service";

export const EntityConfigProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [tabType, setTabType] = useState("basic_details");
  const [formType, setFormType] = useState("Add");
  const [componentType, setComponentType] = useState("listing");
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [createdUserId, setCreatedUserId] = useState(null);
  const [filter, setFilter] = useState({ name: "", role_id: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [countryListOptions, setCountryListOptions] = useState([]);
  const [countryCodeOptions, setCountryCodeOptions] = useState([]);
  const [separatorOptions, setSeparatorOptions] = useState([
    { value: "comma", label: "Comma (,)" },
    { value: "dot", label: "Dot (.)" },
  ]);
  const [currencyPositionOptions, setCurrencyPositionOptions] = useState([
    { value: "Start", label: "Start" },
    { value: "End", label: "End" },
  ]);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllEntityList({ limit, page, filter });

      if (data.success) {
        setListing(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setListing(null);
        setTotalPages(null);
      }
    } catch (error) {
      setListing(null);
      setTotalPages(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Get Data By Id
  const getDataById = async (id) => {
    try {
      const response = await getEntityById(id);
      if (response.data.success) {
        setData(response.data.data[0]);
      } else {
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      setData(null);
    }
  };

  // Handle Form Visibility
  const handleFormVisibility = (visibility, formType) => {
    if (visibility === "open") {
      if (formType === "add") {
        setFormType("Add");
        setUpdateId(null);
        setData(null);
      } else if (formType === "update") {
        setFormType("Update");
      }
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
      setUpdateId(null);
      setData(null);
    }
  };

  // Handle View Visibility
  const handleViewVisibility = (type) => {
    if (type === "open") {
      setViewVisibility(true);
    } else if (type === "close") {
      setViewVisibility(false);
      setViewId(null);
    }
  };

  // Handle Component Type
  const handleComponentView = (type) => {
    setComponentType((prev) => (prev = type));
  };

  // Handle Component Type
  const handleComponentClose = () => {
    setData(null);
    setUpdateId(null);
    setViewId(null);
    setCreatedUserId(null);
  };

  // Handle User Delete Functionality
  const handleDelete = async (id) => {
    try {
      const response = await deleteEntity(id);

      if (response.success) {
        toast.success(response.message);
        getAllData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle User Active/Inactive
  const handleActiveInactive = async (id) => {
    try {
      const response = await updateEntityStatus(id);

      if (response.success) {
        toast.success(response.message);
        getAllData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Set Limit
  const handleLimitChange = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  // Handle Filter Value
  const handleChangeFilter = (type, e) => {
    if (type === "input") {
      const { name, value } = e.target;
      setFilter((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "dropdown") {
      const { field, value } = e;
      setFilter((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle Tabs Click
  const handleTabClick = (tabType) => {
    setTabType(tabType);
  };

  // Get All Country Codes
  const getAllCountryCodesOptions = async () => {
    try {
      const response = await getAllPhoneCodes({
        limit: 500,
        page: "",
        filter: { name: "" },
      });

      if (response.success) {
        setCountryCodeOptions(
          response.data.map((data) => ({
            value: data.code,
            label: data.code,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setCountryCodeOptions(null);
    }
  };

  // Get All Country List
  const getAllCountryOptions = async () => {
    try {
      const response = await getAllCountries({
        limit: 500,
        page: "",
        filter: { name: "" },
      });

      if (response.success) {
        setCountryListOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setCountryListOptions(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter, updateId, deleteId]);

  // For update operations
  useEffect(() => {
    if (updateId || viewId) {
      const id = updateId || viewId;
      getDataById(id);
    }
  }, [updateId, viewId, tabType]);

  // For Delete operations
  useEffect(() => {
    if (deleteId) {
      const id = deleteId;
      handleDelete(id);
    }
  }, [deleteId]);

  useEffect(() => {
    getAllCountryOptions();
    getAllCountryCodesOptions();
  }, [updateId]);

  const styledComponent = {
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

  const formSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      borderRadius: "0.5rem",
      borderColor: "rgb(78, 79, 80)",
      fontSize: "0.8rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.8rem",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "3px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "2px",
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
      fontSize: "0.8rem",
    }),
  };

  const contextValue = {
    listing,
    viewModules,
    viewVisibility,
    formVisibility,
    formType,
    data,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    viewId,
    updateId,
    createdUserId,
    deleteId,
    tabType,
    componentType,
    formSelectStyles,
    styledComponent,
    countryCodeOptions,
    countryListOptions,
    separatorOptions,
    currencyPositionOptions,
    getAllData,
    getDataById,
    setUpdateId,
    setDeleteId,
    setPage,
    setViewId,
    setData,
    setCreatedUserId,
    setViewVisibility,
    setCountryCodeOptions,
    setCountryListOptions,
    setComponentType,
    handleFormVisibility,
    handleTabClick,
    handleLimitChange,
    handleChangeFilter,
    handleActiveInactive,
    handleViewVisibility,
    handleComponentView,
    handleComponentClose,
  };

  return (
    <EntityConfigContext.Provider value={contextValue}>
      {children}
    </EntityConfigContext.Provider>
  );
};

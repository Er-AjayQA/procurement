import { useEffect, useState } from "react";
import {
  getAllCountries,
  getAllDepartments,
  getAllEventCategory,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { RegisteredEventsContext } from "./registeredEventsContext";
import {
  getAllEmployeeDetails,
  getEmployeeDetails,
} from "../../../services/employeeDetails_services/services";
import { useSelector } from "react-redux";
import {
  deleteEvent,
  getAllEventsList,
  getEventById,
} from "../../../services/eventManagement_services/service";

export const RegisteredEventsProvider = ({ children }) => {
  const { userDetails, activeEntity } = useSelector((state) => state.auth);
  const [listing, setListing] = useState(null);
  const [loginUserData, setLoginUserData] = useState(null);
  const [approvalByMeListing, setApprovalByMeListing] = useState(null);
  const [data, setData] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [componentType, setComponentType] = useState("listing");
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [allocationData, setAllocationData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({
    event_category_id: "",
    event_type: "",
  });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userOptions, setUserOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [eventCategoryOptions, setEventCategoryOptions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [statusOptions, setStatusOptions] = useState([
    { value: "DRAFT", label: "DRAFT" },
    { value: "PUBLISHED", label: "PUBLISHED" },
    { value: "CANCELLED", label: "CANCELLED" },
    { value: "FINISHED", label: "FINISHED" },
  ]);
  const [eventTypeOptions, setEventTypeOptions] = useState([
    { value: "In-Person", label: "In-Person" },
    { value: "Online", label: "Online" },
    { value: "Hybrid", label: "Hybrid" },
  ]);
  const [registrationRequiredOptions, setRegistrationRequiredOptions] =
    useState([
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ]);
  const [sittingTypeOptions, setSittingTypeOptions] = useState([
    { value: "Unlimited", label: "Unlimited" },
    { value: "Limited", label: "Limited" },
  ]);

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Get All Events
  const getAllData = async (selectedEntity) => {
    try {
      setIsLoading(true);
      const data = await getAllEventsList(selectedEntity, {
        limit,
        page,
        filter,
      });

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
      const response = await getEventById(id);
      if (response.success) {
        setData(response.data[0]);
      } else {
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      setData(null);
    }
  };

  // Get Login User Data By Id
  const getLoginUserDataById = async (id) => {
    try {
      const response = await getEmployeeDetails(id);
      if (response.data.success) {
        setLoginUserData(response.data.data[0]);
      } else {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      setLoginUserData(null);
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
  };

  // Handle Event Delete Functionality
  const handleDelete = async (id) => {
    try {
      const response = await deleteEvent(id);

      if (response.success) {
        toast.success(response.message);
        setDeleteId(null);
        getAllData(activeEntity);
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

  // Get All Event Category List
  const getAllEventCategoryOptions = async (selectedEntity) => {
    try {
      const response = await getAllEventCategory(selectedEntity, {
        limit: 5000,
        page: "",
        filter: {
          name: "",
        },
      });

      if (response.success) {
        setEventCategoryOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: `${data?.event_category_name}`,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setEventCategoryOptions(null);
    }
  };

  // Get All Users List
  const getAllUsersOptions = async () => {
    try {
      const response = await getAllEmployeeDetails({
        limit: "",
        page: "",
        filter: {
          role_id: "",
          user_id: "",
        },
      });

      if (response.success) {
        setUserOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: `${data?.name} - ${data?.emp_code}`,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUserOptions(null);
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
        setCountryOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setCountryOptions(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    if (activeEntity) {
      getAllData(activeEntity, userDetails?.id);
    }
  }, [
    limit,
    page,
    filter,
    refreshTrigger,
    userDetails?.id,
    deleteId,
    activeEntity,
  ]);

  useEffect(() => {
    if (activeEntity) {
      getAllUsersOptions();
      getAllEventCategoryOptions(activeEntity);
      getAllCountryOptions();
    }
  }, [updateId, deleteId, refreshTrigger, activeEntity]);

  // For update operations
  useEffect(() => {
    if (updateId || viewId) {
      const id = updateId || viewId;
      getDataById(id);
    }
  }, [updateId, viewId]);

  // For Get User Data operations
  useEffect(() => {
    if (userDetails) {
      const id = userDetails?.id;
      getLoginUserDataById(id);
    }
  }, [userDetails]);

  // For Delete operations
  useEffect(() => {
    if (deleteId) {
      const id = deleteId;
      handleDelete(id);
    }
  }, [deleteId]);

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
      borderColor: "rgb(209 213 219)",
      fontSize: "0.8rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
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

  const formatDateTime = (time) => {
    if (!time) return "N/A";

    const date = new Date(time);

    return date
      .toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const contextValue = {
    listing,
    approvalByMeListing,
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
    deleteId,
    allocationData,
    componentType,
    formSelectStyles,
    styledComponent,
    departmentOptions,
    userOptions,
    statusOptions,
    eventCategoryOptions,
    eventTypeOptions,
    countryOptions,
    registrationRequiredOptions,
    sittingTypeOptions,
    loginUserData,
    formatDateTime,
    refreshData,
    // handleFormClose,
    getDataById,
    getAllData,
    getAllUsersOptions,
    setUpdateId,
    setDeleteId,
    setPage,
    setViewId,
    setAllocationData,
    setData,
    setViewVisibility,
    setDepartmentOptions,
    setComponentType,
    setUserOptions,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    handleViewVisibility,
    handleComponentView,
    handleComponentClose,
  };

  return (
    <RegisteredEventsContext.Provider value={contextValue}>
      {children}
    </RegisteredEventsContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AllTicketContext } from "./allTicketContext";
import {
  getAllDepartments,
  getAllTicketCategory,
} from "../../../services/master_services/service";
import {
  getAllEmployeeDetails,
  getEmployeeDetails,
} from "../../../services/employeeDetails_services/services";
import {
  deleteTicket,
  getAllTicketsDetails,
  getTicketDetailsById,
} from "../../../services/ticket_services/service";

export const AllTicketProvider = ({ children }) => {
  const { userDetails } = useSelector((state) => state.auth);
  const [listing, setListing] = useState(null);
  const [approvalByMeListing, setApprovalByMeListing] = useState(null);
  const [data, setData] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [componentType, setComponentType] = useState("listing");
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [filter, setFilter] = useState({
    created_by_user_id: "",
    created_for_dept_id: "",
    ticket_category_id: "",
  });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userOptions, setUserOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [ticketCategoryOptions, setTicketCategoryOptions] = useState([]);
  const [tabList, setTabList] = useState([
    { name: "All Tickets", value: "my_requests" },
    { name: "Allocated to Me", value: "allocate_to_me" },
  ]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Get All Tickets
  const getAllTicketsData = async (id) => {
    try {
      setIsLoading(true);
      const data = await getAllTicketsDetails({
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
      const response = await getTicketDetailsById(id);
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

  // Get All Ticket Category List
  const getAllTicketCategoryOptions = async () => {
    try {
      const response = await getAllTicketCategory({
        limit: 5000,
        page: "",
        filter: {
          name: "",
          priority: "",
        },
      });

      if (response.success) {
        setTicketCategoryOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: `${data?.ticket_category_name} - ${data?.ticket_category_code}`,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setTicketCategoryOptions(null);
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

  // Get All Department List
  const getAllDepartmentOptions = async () => {
    try {
      const response = await getAllDepartments({
        limit: 500,
        page: "",
        filter: "",
      });

      if (response.success) {
        setDepartmentOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setDepartmentOptions(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    if (componentType === "listing") {
      getAllTicketsData();
    }
  }, [limit, page, filter, refreshTrigger, componentType]);

  // For View operations
  useEffect(() => {
    if (viewId) {
      const id = viewId;
      getDataById(id);
    }
  }, [viewId]);

  // Get Filter Options Data
  useEffect(() => {
    getAllTicketCategoryOptions();
    getAllUsersOptions();
    getAllDepartmentOptions();
  }, []);

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
    componentType,
    formSelectStyles,
    styledComponent,
    departmentOptions,
    userOptions,
    ticketCategoryOptions,
    tabList,
    refreshData,
    getDataById,
    setUpdateId,
    setPage,
    setViewId,
    setData,
    setViewVisibility,
    setDepartmentOptions,
    setComponentType,
    setTabList,
    setUserOptions,
    handleLimitChange,
    handleChangeFilter,
    handleViewVisibility,
    handleComponentView,
    handleComponentClose,
  };

  return (
    <AllTicketContext.Provider value={contextValue}>
      {children}
    </AllTicketContext.Provider>
  );
};

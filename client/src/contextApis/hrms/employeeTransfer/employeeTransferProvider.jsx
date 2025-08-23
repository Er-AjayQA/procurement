import { useEffect, useState } from "react";
import {
  getAllBranches,
  getAllDepartments,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { EmployeeTransferContext } from "./employeeTransferContext";
import {
  deleteTransfer,
  getAllTransfer,
  getTransferById,
} from "../../../services/hrms_services/service";

export const EmployeeTransferProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [data, setData] = useState(null);
  const [rolesOptions, setRolesOptions] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [currentTab, setCurrentTab] = useState("my_requests");
  const [tabType, setTabType] = useState({
    name: "My Requests",
    value: "my_requests",
  });
  const [formType, setFormType] = useState("Add");
  const [componentType, setComponentType] = useState("listing");
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [createdUserId, setCreatedUserId] = useState(null);
  const [filter, setFilter] = useState({
    requested_for_user_id: "",
    from_dept_id: "",
    from_branch_id: "",
    approval_status: "PENDING",
  });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);

  // Get All Listing Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTransfer({ limit, page, filter });

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
      const response = await getTransferById(id);
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
      const response = await deleteTransfer(id);

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
    setCurrentTab(tabType.value);
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

  // Get All Branch List
  const getAllBranchOptions = async () => {
    try {
      const response = await getAllBranches({
        limit: 5000,
        page: "",
        filter: {
          billing_status: "",
          status: "",
          name: "",
        },
      });

      if (response.success) {
        setBranchOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setBranchOptions(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter, updateId, deleteId, tabType]);

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
    if (tabType.value === "my_requests") {
      setFilter((prev) => ({ ...prev, approval_status: "" }));
    }
    if (tabType.value === "drafted_requests") {
      setFilter((prev) => ({ ...prev, approval_status: "DRAFT" }));
    }
    if (tabType.value === "approved_by_me") {
      setFilter((prev) => ({ ...prev, approval_status: "APPROVED" }));
    }
    if (tabType.value === "rejected_by_me") {
      setFilter((prev) => ({ ...prev, approval_status: "REJECTED" }));
    }
    if (tabType.value === "Completed") {
      setFilter((prev) => ({ ...prev, approval_status: "COMPLETED" }));
    }
  }, [tabType]);

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
    currentTab,
    componentType,
    formSelectStyles,
    styledComponent,
    rolesOptions,
    departmentOptions,
    designationOptions,
    branchOptions,
    getAllData,
    getDataById,
    setUpdateId,
    setDeleteId,
    setPage,
    setViewId,
    setData,
    setCreatedUserId,
    setViewVisibility,
    setDepartmentOptions,
    setDesignationOptions,
    setBranchOptions,
    setComponentType,
    handleFormVisibility,
    handleTabClick,
    handleLimitChange,
    handleChangeFilter,
    handleViewVisibility,
    handleComponentView,
    handleComponentClose,
  };

  return (
    <EmployeeTransferContext.Provider value={contextValue}>
      {children}
    </EmployeeTransferContext.Provider>
  );
};

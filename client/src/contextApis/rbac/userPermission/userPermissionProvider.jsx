import { useEffect, useState } from "react";
import { UserPermissionContext } from "./userPermissionContext";
import { getAllRoles } from "../../../services/master_services/service";
import {
  allUsersModuleAccessService,
  moduleService,
  revokeUserPermissions,
} from "../../../services/rbac_services/service";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";
import { toast } from "react-toastify";

export const UserPermissionProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [rolesList, setRolesList] = useState(null);
  const [allModules, setAllModules] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [componentType, setComponentType] = useState("listing");
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({ user_id: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Users List
  const getAllUsersList = async (id) => {
    try {
      const response = await getAllEmployeeDetails({
        limit: 5000,
        page: "",
        filter: { role_id: id },
      });

      if (response.success) {
        setUsersList(
          response.data.map((data) => ({
            value: `${data?.id}`,
            label: `${data?.name} - ${data?.emp_code}`,
          }))
        );
      } else {
        setUsersList(null);
      }
    } catch (error) {
      setUsersList(null);
    }
  };

  // Get All Roles List
  const getAllRolesList = async () => {
    try {
      const response = await getAllRoles({
        limit: 500,
        page,
        filter: null,
      });

      if (response.success) {
        setRolesList(
          response.data.map((data) => ({
            value: `${data?.id}`,
            label: `${data?.name}`,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setRolesList(null);
    }
  };

  // Get All Modules List
  const getAllModulesList = async () => {
    try {
      const response = await moduleService();

      if (response.success) {
        setAllModules(response.data);
      } else {
        throw new Error("Getting an error while fetching modules list!");
      }
    } catch (error) {
      setAllModules(null);
    }
  };

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await allUsersModuleAccessService({ limit, page, filter });

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

  // Revoke User Permissions
  const revokeAllUserPermissions = async (id) => {
    try {
      setIsLoading(true);
      const data = await revokeUserPermissions(id);

      if (data.success) {
        toast.success(data.message);
        setDeleteId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setDeleteId(null);
    }
  };

  // Get Data By Id
  const getDataById = async (id) => {
    try {
      const response = await allUsersModuleAccessService({
        limit,
        page,
        filter: { user_id: id },
      });
      if (response.success) {
        setData(response.data);
        setViewModules(response.data[0]?.permissions);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setData(null);
      setViewModules(null);
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
    setRolesList(null);
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
  }, [updateId, viewId]);

  // Get User list
  useEffect(() => {
    getAllUsersList();
  }, [updateId]);

  // Get Role list
  useEffect(() => {
    getAllRolesList();
  }, [updateId]);

  // Get All Modules List
  useEffect(() => {
    getAllModulesList();
  }, []);

  useEffect(() => {
    if (deleteId) revokeAllUserPermissions(deleteId);
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

  const contextValue = {
    listing,
    formVisibility,
    formType,
    data,
    updateId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    viewId,
    viewVisibility,
    componentType,
    usersList,
    viewModules,
    allModules,
    rolesList,
    styledComponent,
    deleteId,
    getAllData,
    getDataById,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    setDeleteId,
    getAllUsersList,
    setPage,
    setViewId,
    setData,
    setViewVisibility,
    setComponentType,
    handleViewVisibility,
    handleComponentView,
    handleComponentClose,
  };

  return (
    <UserPermissionContext.Provider value={contextValue}>
      {children}
    </UserPermissionContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { UserPermissionContext } from "./userPermissionContext";
import { toast } from "react-toastify";
import {
  getAllCourses,
  getCourseById,
  updateCourseStatus,
} from "../../../services/lms_services/service";
import { getAllCourseCategory } from "../../../services/master_services/service";
import {
  allUsersModuleAccessService,
  moduleAccessService,
} from "../../../services/rbac_services/service";
import {
  getAllEmployeeDetails,
  getEmployeeDetails,
} from "../../../services/employeeDetails_services/services";

export const UserPermissionProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [viewModules, setViewModules] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [assessmentDetails, setAssessmentDetails] = useState(null);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [componentType, setComponentType] = useState("listing");
  const [basicDetails, setBasicDetails] = useState(null);
  const [contentDetails, setContentDetails] = useState(null);
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [filter, setFilter] = useState({ user_id: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState(null);

  // Get All Users List
  const getAllUsersList = async () => {
    try {
      const response = await getAllEmployeeDetails();

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

  // Course Category Options
  const getAllCourseCategories = async () => {
    try {
      const response = await getAllCourseCategory({
        limit: "",
        page: "",
        filter: { name: "" },
      });

      if (response.success) {
        setCategoryOptions(
          response.data.map((data) => ({ value: data.id, label: data.name }))
        );
      } else {
        setCategoryOptions(null);
      }
    } catch (error) {
      setCategoryOptions(null);
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
    setBasicDetails(null);
    setAssessmentDetails(null);
    setQuestionDetails(null);
    setContentDetails(null);
    setUpdateId(null);
    setViewId(null);
  };

  // Handle Active/Inactive
  const handleActiveInactive = async (id) => {
    try {
      const response = await updateCourseStatus(id);

      if (response.success) {
        getAllData();
        toast.success(response.message);
      } else {
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
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

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (updateId || viewId) {
      const id = updateId || viewId;
      getDataById(id);
    }
  }, [updateId, viewId]);

  // For Get All Course Categories
  useEffect(() => {
    getAllCourseCategories();
  }, []);

  // Get User list
  useEffect(() => {
    getAllUsersList();
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

  console.log("View Modules", viewModules);
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
    assessmentDetails,
    basicDetails,
    contentDetails,
    questionDetails,
    viewId,
    viewVisibility,
    componentType,
    usersList,
    viewModules,
    getAllData,
    getDataById,
    handleFormVisibility,
    handleActiveInactive,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    categoryOptions,
    setPage,
    setViewId,
    setData,
    setViewVisibility,
    setComponentType,
    handleViewVisibility,
    handleComponentView,
    styledComponent,
    handleComponentClose,
  };

  return (
    <UserPermissionContext.Provider value={contextValue}>
      {children}
    </UserPermissionContext.Provider>
  );
};

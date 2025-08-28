import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeIdCardContext } from "./idCardContext";
import {
  createIdCard,
  deleteIdCard,
  getIdCardById,
} from "../../../services/hrms_services/service";
import {
  getAllEmployeeDetails,
  getEmployeeDetails,
} from "../../../services/employeeDetails_services/services";

export const EmployeeIdCardProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [generateId, setGenerateId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({ name: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllEmployeeDetails({ limit, page, filter });

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
      const response = await getIdCardById(id);
      if (response.success) {
        setData(response.data[0]);
      } else {
        toast.error(response.message);
        setData(null);
      }
    } catch (error) {
      setData(null);
    }
  };

  // Get User Data By Id
  const getUserDataById = async (id) => {
    try {
      const response = await getEmployeeDetails(id);
      if (response.data.success) {
        setUserData(response.data.data[0]);
      } else {
        toast.error(response.data.message);
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
    }
  };

  // Generate ID Card
  const generateEmployeeIdCard = async (id) => {
    try {
      const response = await createIdCard(id);

      if (response.success) {
        toast.success(response.message);
        getAllData();
        setGenerateId(null);
      } else {
        toast.error(response.message);
        setGenerateId(null);
      }
    } catch (error) {
      setGenerateId(null);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    try {
      const response = await deleteIdCard(deleteId);
      if (response.success) {
        toast(response.message);
        getAllData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setDeleteId(null);
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

  // For View operations
  useEffect(() => {
    if (viewId) {
      let id = viewId;
      getDataById(id);
      getUserDataById(id);
    }
  }, [viewId]);

  // For delete operations
  useEffect(() => {
    if (deleteId) {
      deleteData();
    }
  }, [deleteId]);

  // Generating ID Card when having generate ID
  useEffect(() => {
    if (generateId) {
      generateEmployeeIdCard(generateId);
    }
  }, [generateId]);

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
    data,
    deleteId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    styledComponent,
    viewVisibility,
    userData,
    getAllData,
    getDataById,
    deleteData,
    handleLimitChange,
    handleChangeFilter,
    setDeleteId,
    setPage,
    setViewId,
    setGenerateId,
    handleViewVisibility,
  };

  return (
    <EmployeeIdCardContext.Provider value={contextValue}>
      {children}
    </EmployeeIdCardContext.Provider>
  );
};

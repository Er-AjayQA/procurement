import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeIdCardContext } from "./idCardContext";
import {
  deleteIdCard,
  getIdCardById,
} from "../../../services/hrms_services/service";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";

export const EmployeeIdCardProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
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
      }
    } catch (error) {
      setData(null);
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

  // Handle Form Visibility
  const handleFormVisibility = (visibility, formType) => {
    if (visibility === "open") {
      if (formType === "add") {
        setFormType("Add");
        setData(null);
      } else if (formType === "update") {
        setFormType("Update");
      }
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
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
    }
  }, [viewId]);

  // For delete operations
  useEffect(() => {
    if (deleteId) {
      deleteData();
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

  const contextValue = {
    listing,
    formVisibility,
    formType,
    data,
    deleteId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    styledComponent,
    viewVisibility,
    getAllData,
    getDataById,
    deleteData,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    setDeleteId,
    setPage,
    setViewId,
    handleViewVisibility,
  };

  return (
    <EmployeeIdCardContext.Provider value={contextValue}>
      {children}
    </EmployeeIdCardContext.Provider>
  );
};

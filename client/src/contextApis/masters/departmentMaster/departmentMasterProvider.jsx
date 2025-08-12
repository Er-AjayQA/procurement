import { useEffect, useState } from "react";
import { DepartmentMasterContext } from "./departmentMasterContext";
import {
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentStatus,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";

export const DepartmentMasterProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Master Data
  const getAllData = async () => {
    setIsLoading(true);
    const data = await getAllDepartments({ limit, page, filter });

    if (data.success) {
      setIsLoading(false);
      setListing(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      setIsLoading(false);
      setListing([]);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getDepartmentById(updateId);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    const response = await deleteDepartment(deleteId);
    if (response.success) {
      toast(response.message);
      getAllData();
      setDeleteId(null);
    } else {
      toast.error(response.message);
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

  // Handle Active/Inactive
  const handleActiveInactive = async (id) => {
    try {
      const response = await updateDepartmentStatus(id);

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
  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (updateId) {
      getDataById();
    }
  }, [updateId]);

  // For delete operations
  useEffect(() => {
    if (deleteId) {
      deleteData();
    }
  }, [deleteId]);

  const contextValue = {
    listing,
    formVisibility,
    formType,
    data,
    updateId,
    deleteId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    getAllData,
    getDataById,
    deleteData,
    handleFormVisibility,
    handleActiveInactive,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    setDeleteId,
    setPage,
  };

  return (
    <DepartmentMasterContext.Provider value={contextValue}>
      {children}
    </DepartmentMasterContext.Provider>
  );
};

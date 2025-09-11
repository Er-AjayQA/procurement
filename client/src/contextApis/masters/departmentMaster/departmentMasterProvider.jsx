import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DepartmentMasterContext } from "./departmentMasterContext";
import {
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentStatus,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";

export const DepartmentMasterProvider = ({ children }) => {
  const { activeEntity } = useSelector((state) => state.auth);
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
  const getAllData = async (selectedEntity) => {
    setIsLoading(true);
    const data = await getAllDepartments(selectedEntity, {
      limit,
      page,
      filter,
    });

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
  const getDataById = async (selectedEntity) => {
    const response = await getDepartmentById(selectedEntity, updateId);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Data By Id
  const deleteData = async (selectedEntity) => {
    const response = await deleteDepartment(selectedEntity, deleteId);
    if (response.success) {
      toast(response.message);
      getAllData(selectedEntity);
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
  const handleActiveInactive = async (selectedEntity, id) => {
    try {
      const response = await updateDepartmentStatus(selectedEntity, id);

      if (response.success) {
        getAllData(activeEntity);
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
    if (activeEntity) {
      getAllData(activeEntity);
    }
  }, [limit, page, filter, activeEntity]);

  // For update operations
  useEffect(() => {
    if (activeEntity && updateId) {
      getDataById(activeEntity);
    }
  }, [updateId]);

  // For delete operations
  useEffect(() => {
    if (activeEntity && deleteId) {
      deleteData(activeEntity);
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

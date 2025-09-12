import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UomMasterContext } from "./uomMasterContext";
import {
  deleteUom,
  getAllUom,
  getUomById,
  updateUomStatus,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";

export const UomMasterProvider = ({ children }) => {
  const { activeEntity } = useSelector((state) => state.auth);
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({ name: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Master Data
  const getAllData = async (selectedEntity) => {
    try {
      setIsLoading(true);
      const data = await getAllUom(selectedEntity, { limit, page, filter });

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
    const response = await getUomById(id);
    if (response.success) {
      setData(response.data[0]);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    try {
      const response = await deleteUom(deleteId);
      if (response.success) {
        toast(response.message);
        getAllData(activeEntity);
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

  // Handle Active/Inactive
  const handleActiveInactive = async (id) => {
    try {
      const response = await updateUomStatus(id);

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
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    if (activeEntity) {
      getAllData(activeEntity);
    }
  }, [limit, page, filter, activeEntity]);

  // For update operations
  useEffect(() => {
    if (updateId || viewId) {
      const id = updateId || viewId;
      getDataById(id);
    }
  }, [updateId, viewId]);

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
    viewVisibility,
    viewId,
    getAllData,
    getDataById,
    deleteData,
    handleFormVisibility,
    handleActiveInactive,
    handleLimitChange,
    handleChangeFilter,
    setViewId,
    setUpdateId,
    setDeleteId,
    setPage,
    handleViewVisibility,
  };

  return (
    <UomMasterContext.Provider value={contextValue}>
      {children}
    </UomMasterContext.Provider>
  );
};

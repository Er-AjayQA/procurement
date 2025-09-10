import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRoleStatus,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { RoleMasterContext } from "./roleMasterContext";

export const RoleMasterProvider = ({ children }) => {
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

  // Get Master Roles List From API
  const getAllMasters = async (selectedEntity) => {
    setIsLoading(true);
    const data = await getAllRoles(selectedEntity, { limit, page, filter });

    if (data.success) {
      setIsLoading(false);
      setListing(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      setIsLoading(false);
      setListing([]);
    }
  };

  // Get Role Data By Id
  const getRoleDataById = async (selectedEntity) => {
    const response = await getRoleById(selectedEntity, updateId);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Role By Id
  const deleteRoleMaster = async (selectedEntity) => {
    const response = await deleteRole(selectedEntity, deleteId);
    if (response.success) {
      toast(response.message);
      getAllMasters();
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

  // Handle Role Active/Inactive
  const handleRoleActiveInactive = async (selectedEntity, id) => {
    try {
      const response = await updateRoleStatus(selectedEntity, id);

      if (response.success) {
        getAllMasters(selectedEntity);
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

  // HAndle Filter Value
  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    if (activeEntity) {
      getAllMasters(activeEntity);
    }
  }, [limit, page, filter, activeEntity]);

  // For update operations
  useEffect(() => {
    if (activeEntity && updateId) {
      getRoleDataById(activeEntity);
    }
  }, [updateId]);

  // For delete operations
  useEffect(() => {
    if (activeEntity && deleteId) {
      deleteRoleMaster(activeEntity);
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
    getAllMasters,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    handleRoleActiveInactive,
    setUpdateId,
    setDeleteId,
    setPage,
  };

  return (
    <RoleMasterContext.Provider value={contextValue}>
      {children}
    </RoleMasterContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { ItemMasterContext } from "./itemMasterContext";
import {
  deleteItem,
  getAllItem,
  getItemById,
  updateItemStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";

export const ItemMasterProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({ name: "", item_category_id: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllItem({ limit, page, filter });

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
    const response = await getItemById(id);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    try {
      const response = await deleteItem(deleteId);
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
      const response = await updateItemStatus(id);

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
    if (viewId || updateId) {
      let id = viewId || updateId;
      getDataById(id);
    }
  }, [updateId, viewId]);

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
    viewId,
    updateId,
    deleteId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    viewVisibility,
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
    setViewId,
    styledComponent,
    handleViewVisibility,
  };

  return (
    <ItemMasterContext.Provider value={contextValue}>
      {children}
    </ItemMasterContext.Provider>
  );
};

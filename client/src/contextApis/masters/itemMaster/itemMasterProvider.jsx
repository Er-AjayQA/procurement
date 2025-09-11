import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ItemMasterContext } from "./itemMasterContext";
import {
  deleteItem,
  getAllItem,
  getAllItemCategory,
  getAllUom,
  getItemById,
  updateItemStatus,
} from "../../../services/master_services/service";
import { toast } from "react-toastify";

export const ItemMasterProvider = ({ children }) => {
  const { activeEntity } = useSelector((state) => state.auth);
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
  const [itemCategoryOptions, setItemCategoryOptions] = useState([]);
  const [uomOptions, setUomOptions] = useState([]);

  // Get All Master Data
  const getAllData = async (selectedEntity) => {
    try {
      setIsLoading(true);
      const data = await getAllItem(selectedEntity, { limit, page, filter });

      if (data?.success) {
        setIsLoading(false);
        setListing(data?.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setIsLoading(false);
        setListing(null);
        setTotalPages(null);
      }
    } catch (error) {
      setIsLoading(false);
      setListing(null);
      setTotalPages(null);
    }
  };

  // Get Data By Id
  const getDataById = async (id) => {
    try {
      const response = await getItemById(id);
      if (response?.success) {
        setData(response?.data[0]);
      } else {
        setData(null);
      }
    } catch (error) {
      toast.error(error.message || "Item details not found!");
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    try {
      const response = await deleteItem(deleteId);
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
      const response = await updateItemStatus(id);

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

  // Get All Item Category List
  const getAllCategoryList = async (selectedEntity) => {
    try {
      let formData = {
        limit: 5000,
        page: 1,
        filter: { name: "" },
      };
      const response = await getAllItemCategory(selectedEntity, formData);

      if (response.success) {
        setItemCategoryOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      }
    } catch (error) {
      setItemCategoryOptions([]);
    }
  };

  // Get All UOM List
  const getAllUomList = async (selectedEntity) => {
    try {
      const response = await getAllUom(selectedEntity, {
        limit: 5000,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setUomOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      }
    } catch (error) {
      setUomOptions([]);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    if (activeEntity) {
      getAllData(activeEntity);
    }
  }, [limit, page, filter, activeEntity]);

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

  // Fetching Item Cateogry and Item on initial loading
  useEffect(() => {
    if (activeEntity) {
      getAllCategoryList(activeEntity);
      getAllUomList(activeEntity);
    }
  }, [activeEntity]);

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

  const selectStyles = {
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
    formVisibility,
    formType,
    selectStyles,
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
    getAllCategoryList,
    getAllUomList,
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
    itemCategoryOptions,
    uomOptions,
    handleViewVisibility,
  };

  return (
    <ItemMasterContext.Provider value={contextValue}>
      {children}
    </ItemMasterContext.Provider>
  );
};

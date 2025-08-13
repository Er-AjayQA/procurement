import { useEffect, useState } from "react";
import { CoursesContext } from "./coursesContext";
import { toast } from "react-toastify";
import {
  getAllCourses,
  getCourseById,
  updateCourseStatus,
} from "../../../services/lms_services/service";
import { getAllCourseCategory } from "../../../services/master_services/service";

export const CoursesProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [assessmentDetails, setAssessmentDetails] = useState(null);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [basicDetails, setBasicDetails] = useState(null);
  const [contentDetails, setContentDetails] = useState(null);
  const [data, setData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [filter, setFilter] = useState({ name: "" });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState(null);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCourses({ limit, page, filter });

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
      const response = await getCourseById(id);
      if (response.success) {
        setData(response.data);
        setBasicDetails(response.data.basicDetails[0]);
        setContentDetails(response.data.contentDetails);
        setAssessmentDetails(response.data.assessmentDetails[0]);
        setQuestionDetails(
          response.data.assessmentDetails[0].assessmentQuestions
        );
      } else {
        setData(null);
        setBasicDetails(null);
        setContentDetails(null);
        setAssessmentDetails(null);
        setQuestionDetails(null);
      }
    } catch (error) {
      setData(null);
      setBasicDetails(null);
      setContentDetails(null);
      setAssessmentDetails(null);
      setQuestionDetails(null);
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
    if (updateId) {
      getDataById(updateId);
    }
  }, [updateId]);

  // For Get All Course Categories
  useEffect(() => {
    getAllCourseCategories();
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
    getAllData,
    getDataById,
    handleFormVisibility,
    handleActiveInactive,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    categoryOptions,
    setPage,
    styledComponent,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};

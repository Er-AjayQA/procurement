import { useCallback, useEffect, useState } from "react";
import { getAllDepartments } from "../../../services/master_services/service";
import { toast } from "react-toastify";
import { CalendarContext } from "./calendarContext";
import { getAllEmployeeDetails } from "../../../services/employeeDetails_services/services";
import { useSelector } from "react-redux";
import {
  deleteTicket,
  getTicketDetailsById,
} from "../../../services/ticket_services/service";

export const CalendarProvider = ({ children }) => {
  const { userDetails } = useSelector((state) => state.auth);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(null);
  const [dateTab, setDateTab] = useState([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(null);
  const [dateListing, setDateListing] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [viewEventVisibility, setViewEventVisibility] = useState(false);
  const [currentViewStyle, setCurrentViewStyle] = useState("month");
  const [viewId, setViewId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userOptions, setUserOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [viewStyleOptions, setViewStyleOptions] = useState([
    { value: "month", label: "Month Wise" },
    { value: "weekly", label: "Weekly" },
  ]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [monthsOptions, setMonthsOptions] = useState([
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ]);
  const [selectedMonth, setSelectedMonth] = useState(
    monthsOptions.find((month) => month.value == new Date().getMonth())
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearsOptions, setYearsOptions] = useState([]);
  const [daysOptions, setDaysOptions] = useState([
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTypeOptions, setEventTypeOptions] = useState([
    { value: "birthday", label: "Birthday" },
    { value: "event", label: "Event" },
    { value: "meeting", label: "Meeting" },
  ]);
  const [defaultEventType, setDefaultEventType] = useState("birthday");
  const [reminderOptions, setReminderOptions] = useState([
    { value: "1 week", label: "1 Week Before" },
    { value: "1 day", label: "1 Day Before" },
    { value: "30 minutes", label: "30 Minutes Before" },
    { value: "10 minutes", label: "10 Minutes Before" },
  ]);
  const [dressOptions, setDressOptions] = useState([
    { value: "casual", label: "Casual" },
    { value: "smart-casual", label: "Smart Casual" },
    { value: "formal", label: "Formal" },
    { value: "informal", label: "Informal" },
  ]);
  const [selectedFullDateFormat, setSelectedFullDateFormat] = useState(null);

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Add this helper function to get month label
  const getMonthLabel = (monthValue) => {
    const month = monthsOptions.find(
      (opt) => parseInt(opt.value) === monthValue
    );
    return month ? month.label : "Unknown Month";
  };

  // Get Days In Month
  const getDaysInMonth = (date) => {
    try {
      if (!currentDate) {
        toast.error("Invalid date selection!");
        return;
      }

      setTotalDaysInMonth(
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      );
    } catch (error) {
      toast.error(error.message);
      setTotalDaysInMonth(null);
    }
  };

  // Handle Current Date
  const handleCurrentDate = (type) => {
    const newDate = new Date(currentDate);

    if (type === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (type === "next") {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setCurrentDate(newDate);
    setSelectedMonth(
      monthsOptions.find((data) => data.value == newDate.getMonth())
    );
    setSelectedYear(newDate.getFullYear());
  };

  // Handle month change from dropdowns
  const handleMonthChange = (selectedOption) => {
    if (selectedOption) {
      const newDate = new Date(selectedYear, selectedOption.value, 1);
      setCurrentDate(newDate);
      setSelectedMonth(selectedOption);
    }
  };

  // Handle year change from dropdowns
  const handleYearChange = (selectedOption) => {
    if (selectedOption) {
      const newDate = new Date(selectedOption.value, selectedMonth, 1);
      setCurrentDate(newDate);
      setSelectedYear(selectedOption.value);
    }
  };

  // Get First Day Of Month
  const getFirstDayOfMonth = (date) => {
    try {
      if (!currentDate) {
        toast.error("Invalid date selection!");
        return;
      }

      setFirstDayOfMonth(
        new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      );
    } catch (error) {
      toast.error(error.message);
      setFirstDayOfMonth(null);
    }
  };

  // Get Data By Id
  const getDataById = async (id) => {
    try {
      const response = await getTicketDetailsById(id);
      if (response.success) {
        setEventData(response.data[0]);
      } else {
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      setEventData(null);
    }
  };

  // Handle View Visibility
  const handleViewVisibility = () => {
    setViewEventVisibility((prev) => !prev);
  };

  // Handle User Delete Functionality
  const handleDelete = async (id) => {
    try {
      const response = await deleteTicket(id);

      if (response.success) {
        toast.success(response.message);
        setDeleteId(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  // Handle Tabs Click
  const handleViewStyleClick = (viewtype) => {
    setCurrentViewStyle(viewtype);
  };

  // Get All Users List
  const getAllUsersOptions = async () => {
    try {
      const response = await getAllEmployeeDetails({
        limit: "",
        page: "",
        filter: {
          role_id: "",
          user_id: "",
        },
      });

      if (response.success) {
        setUserOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setUserOptions(null);
    }
  };

  // Get All Department List
  const getAllDepartmentOptions = async () => {
    try {
      const response = await getAllDepartments({
        limit: 500,
        page: "",
        filter: "",
      });

      if (response.success) {
        setDepartmentOptions(
          response?.data.map((data) => ({
            value: data?.id,
            label: data?.name,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setDepartmentOptions(null);
    }
  };

  // Handle Event Form Visibility
  const handleEventForm = (data) => {
    setShowEventForm((prev) => !prev);

    const formattedDay = data < 10 ? `0${data}` : data;
    const formattedMonth =
      selectedMonth.value < 10
        ? `0${parseInt(selectedMonth.value) + 1}`
        : selectedMonth.value + 1;

    setSelectedFullDateFormat(
      `${formattedDay}-${formattedMonth}-${selectedYear}`
    );
  };

  useEffect(() => {
    getAllDepartmentOptions();
    getAllUsersOptions();
  }, [updateId, deleteId]);

  // For update operations
  useEffect(() => {
    if (updateId || viewId) {
      const id = updateId || viewId;
      getDataById(id);
    }
  }, [updateId, viewId]);

  // For Delete operations
  useEffect(() => {
    if (deleteId) {
      const id = deleteId;
      handleDelete(id);
    }
  }, [deleteId]);

  // Load Current Days In Month
  useEffect(() => {
    if (currentDate) {
      getDaysInMonth(currentDate);
      getFirstDayOfMonth(currentDate);
    }
  }, [currentDate]);

  // Load Total Dates In Month
  useEffect(() => {
    if (totalDaysInMonth !== null && firstDayOfMonth !== null) {
      const dateElements = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        dateElements.push(
          <div key={`empty-${i}`} className="text-center p-2 opacity-50"></div>
        );
      }

      // Add cells for each day of the month
      for (let day = 1; day <= totalDaysInMonth; day++) {
        dateElements.push(
          <div
            key={`day-${day}`}
            className="rounded-[20px] text-center p-2 border border-gray-300 min-h-[50px] flex justify-center cursor-pointer items-center hover:bg-gray-100 hover:shadow-md hover:shadow-blue-400"
            onClick={() => handleEventForm(day)}
          >
            {day}
          </div>
        );
      }

      setDateTab(dateElements);
    }
  }, [totalDaysInMonth, firstDayOfMonth]);

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

  const formSelectStyles = {
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

  const formatDateTime = (time) => {
    if (!time) return "N/A";

    const date = new Date(time);

    return date
      .toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  // Generate years options (10 years back and 10 years forward)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push({ value: i, label: i.toString() });
    }
    setYearsOptions(years);
    setSelectedYear(currentYear); // Set initial selected year
  }, []);

  // Helper function to find selected option
  const findSelectedOption = useCallback((options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value) || null;
  }, []);

  console.log("Selected Date====", selectedFullDateFormat);

  const contextValue = {
    viewStyleOptions,
    currentDate,
    totalDaysInMonth,
    firstDayOfMonth,
    filter,
    isLoading,
    viewId,
    updateId,
    deleteId,
    formSelectStyles,
    currentViewStyle,
    styledComponent,
    showEventForm,
    dateTab,
    selectedMonth,
    selectedYear,
    monthsOptions,
    daysOptions,
    departmentOptions,
    userOptions,
    eventTypeOptions,
    reminderOptions,
    dressOptions,
    yearsOptions,
    defaultEventType,
    getMonthLabel,
    formatDateTime,
    refreshData,
    handleCurrentDate,
    getDataById,
    getAllUsersOptions,
    setUpdateId,
    setDeleteId,
    setViewId,
    setSelectedMonth,
    setDefaultEventType,
    setDepartmentOptions,
    setUserOptions,
    handleChangeFilter,
    handleViewVisibility,
    handleEventForm,
    handleViewStyleClick,
    handleMonthChange,
    handleYearChange,
    findSelectedOption,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

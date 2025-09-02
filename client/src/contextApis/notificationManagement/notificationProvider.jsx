import { useEffect, useState } from "react";
import { NotificationContext } from "./notificationContext";
import { toast } from "react-toastify";
import {
  getAllNotificationsService,
  getNotificationDetailService,
  markNotificationAsReadService,
  removeNotificationService,
} from "../../services/notification_services/service";
import { useSelector } from "react-redux";

export const NotificationProvider = ({ children }) => {
  const [listing, setListing] = useState(null);
  const [notificationVisibity, setNotificationVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [archieveId, setArchieveId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({
    title: "",
    archieve: "",
    user_id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { userDetails } = useSelector((state) => state.auth);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllNotificationsService({ filter });

      if (data.success) {
        setListing(data.data);
        const unreadCount = data.data.filter((item) => !item.isReaded).length;
        setNewNotificationsCount(unreadCount);
      } else {
        setListing(null);
        setNewNotificationsCount(0);
      }
    } catch (error) {
      setListing(null);
      setNewNotificationsCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark As Read
  const markAsRead = async (id) => {
    try {
      const data = await markNotificationAsReadService(id);
      if (data.success) {
        getAllData();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Delete Notifications
  const deleteNotification = async (id) => {
    try {
      const data = await removeNotificationService(id);

      if (data.success) {
        toast.success(data.message);
        setDeleteId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setDeleteId(null);
    }
  };

  // Get Data By Id
  const getDataById = async (id) => {
    try {
      const response = await getNotificationDetailService(id);
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setData(null);
    }
  };

  // Handle Notification Visibility
  const handleNotificationVisibility = (type) => {
    if (type === "open") {
      setNotificationVisibility(true);
    } else if (type === "close") {
      setNotificationVisibility(false);
      getAllData();
      setViewId(null);
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

  // Handle Filter Value
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Mark All As Read
  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = listing
        .filter((item) => !item.isReaded)
        .map((item) => item.id);

      await Promise.all(
        unreadIds?.map((id) => markNotificationAsReadService(id))
      );
      getAllData();
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [filter, deleteId, userDetails]);

  // For View operations
  useEffect(() => {
    if (viewId) {
      getDataById(viewId);
      markAsRead(viewId);
      getAllData();
    }
  }, [viewId]);

  useEffect(() => {
    if (deleteId) deleteNotification(deleteId);
  }, [deleteId]);

  useEffect(() => {
    if (userDetails) {
      setFilter((prev) => ({ ...prev, user_id: userDetails?.id }));
    }
  }, []);

  useEffect(() => {
    if (!userDetails?.id) return;

    const pollInterval = setInterval(() => {
      getAllData();
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [userDetails?.id]);

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
    filter,
    isLoading,
    viewId,
    viewVisibility,
    styledComponent,
    deleteId,
    notificationVisibity,
    newNotificationsCount,
    getAllData,
    getDataById,
    handleChangeFilter,
    setDeleteId,
    setViewId,
    setArchieveId,
    setData,
    setViewVisibility,
    handleViewVisibility,
    handleMarkAllAsRead,
    handleNotificationVisibility,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

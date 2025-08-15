import axiosInstance from "../axisInstance";

// Get Notification By ID Service
export const getNotificationDetailService = async (id) => {
  const response = await axiosInstance.post(`/get-notification-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Mark Notification AS Read Service
export const markNotificationAsReadService = async (id) => {
  const response = await axiosInstance.put(`/mark-notification-read/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Get All Notifications Service
export const getAllNotificationsService = async (formData) => {
  const response = await axiosInstance.post(
    "/get-all-notification-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Archieve Notifications Service
export const archieveNotificationService = async (id) => {
  const response = await axiosInstance.post(`/archieve-notification/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Delete Notification Service
export const removeNotificationService = async (id) => {
  const response = await axiosInstance.put(`/delete-notification/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

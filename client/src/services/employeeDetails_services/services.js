import axiosInstance from "../axisInstance";

// Get Employee Details Service
export const getEmployeeDetails = async (id) => {
  const response = await axiosInstance.get(`/get-user-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

// Get All Employee Details Service
export const getAllEmployeeDetails = async (formData) => {
  const response = await axiosInstance.post(`/get-all-users`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

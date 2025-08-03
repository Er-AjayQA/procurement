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
